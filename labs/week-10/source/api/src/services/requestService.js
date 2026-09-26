import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, mkdirSync } from 'node:fs';
import { config } from '../config.js';
import { DatabaseSync } from 'node:sqlite'
const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '../..');
const SCHEMA_FILE = path.resolve(API_ROOT, 'data/schema.sql');

const SELECT_SHAPE = `
  SELECT r.id,
         u.name          AS requesterName,
         r.request_type  AS requestType,
         r.location,
         r.details,
         r.priority,
         r.status
  FROM requests r
  JOIN users u ON u.id = r.requester_id`;

mkdirSync(path.dirname(config.dbFile), { recursive: true });

const db = new DatabaseSync(config.dbFile);
db.exec('PRAGMA foreign_keys = ON');
//config.dbFile;
/**
 * Week 10 — เปลี่ยน service จากอ่านไฟล์ JSON เป็นฐานข้อมูล SQLite
 *
 * ตอนนี้ยังเป็นเวอร์ชัน Week 07 (อ่านไฟล์ JSON) อยู่
 * งานของสัปดาห์นี้คือเปลี่ยนให้ใช้ node:sqlite
 *
 * ⚠ กฎเหล็ก: signature ของทุกฟังก์ชันต้องเหมือนเดิมทุกตัว
 *   → controller และ frontend จะได้ไม่ต้องแก้เลย
 */

// ── ของเดิม Week 07 (อ่านไฟล์ JSON) — จะถูกแทนที่ ──
//const HERE = path.dirname(fileURLToPath(import.meta.url));
//const DATA = path.resolve(HERE, '../..', 'data', 'requests.json');
let requests = [];

export async function loadSeed() {
  /**
   * TODO W10-1 (CP26) · เปิดฐานข้อมูลด้วย node:sqlite
   *   import { DatabaseSync } from 'node:sqlite'
   *   - เปิดไฟล์ campus.db (จากสัปดาห์ที่ 9)
   *   - สั่ง PRAGMA foreign_keys = ON  ⚠ สำคัญมาก
   *   - ถ้ายังไม่มีตาราง ให้สร้างจาก schema.sql
   *
   * TODO W10-2 (CP27) · ⚠ path ต้องอ้างจากตำแหน่งไฟล์นี้ ไม่ใช่จากที่รันคำสั่ง
   *   ใช้ fileURLToPath(import.meta.url) — ไม่งั้น dev กับ checker หาไฟล์คนละที่
   */
  const ready = db.prepare(
    "SELECT COUNT(*) c FROM sqlite_master WHERE type='table' AND name='requests'"
  ).get().c;
 if (!ready) {
    const sql = readFileSync(SCHEMA_FILE, 'utf8');
    db.exec(sql);
  }
  /*try {
    requests = JSON.parse(await readFile(DATA, 'utf8'));
  } catch {
    requests = [];
  }*/
}

export function findAll({ status } = {}) {
  /**
   * TODO W10-3 (CP28) · เปลี่ยนเป็น SELECT จากฐานข้อมูล
   *   - ใช้ JOIN กับตาราง users เพื่อคืน requesterName (ไม่ใช่ requester_id)
   *   - ตั้งชื่อคอลัมน์ด้วย AS ให้ตรงกับที่ frontend ใช้
   *   - ถ้ามี status ให้เติม WHERE r.status = ?
   *   คำใบ้: คัดลอก query จาก queries.sql ที่ทำสัปดาห์ที่แล้วมาปรับ
   */
  return status
    ? db.prepare(`${SELECT_SHAPE} WHERE r.status = ? ORDER BY r.id`).all(status)
    : db.prepare(`${SELECT_SHAPE} ORDER BY r.id`).all();
}

export function findById(id) {
  /** TODO W10-4 (CP28) · SELECT ... WHERE r.id = ?  · ไม่พบให้คืน null */
  return db.prepare(`${SELECT_SHAPE} WHERE r.id = ?`).get(id) ?? null;
}

export function create(input) {
  /**
   * TODO W10-5 (CP29) · INSERT ลงฐานข้อมูล
   *   ⚠ frontend ส่ง requesterName (ชื่อ) มา แต่ตารางเก็บ requester_id (ตัวเลข)
   *   → ต้องหา id ของชื่อนั้นก่อน ถ้ายังไม่มีในระบบให้สร้าง user ใหม่
   *   นี่คือ "หน้าที่ของ service" ที่พูดถึงในบทที่ 9 ของสัปดาห์ที่แล้ว
   */
  const id = nextId();
  const requesterName = (input.requesterName || '').trim();
  const requesterId = resolveUserId(requesterName);

  db.prepare(
    `INSERT INTO requests (id, requester_id, request_type, location, details, priority)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    requesterId,
    input.requestType,
    (input.location || '').trim(),
    (input.details || '').trim(),
    input.priority ?? 'normal'
  );

  return findById(id);
}

export function updateStatus(id, status) {
  /** TODO W10-6 (CP30) · UPDATE requests SET status = ? WHERE id = ? · ไม่พบคืน null */
 const result = db.prepare('UPDATE requests SET status = ? WHERE id = ?')
    .run(status, id);
  return result.changes ? findById(id) : null;
}

export function remove(id) {
  /** TODO W10-7 (CP30) · DELETE FROM requests WHERE id = ? · ไม่พบคืน null */
  const target = findById(id);      // ① หาก่อน
  if (!target) return null;          // ② ไม่พบ → null
  db.prepare('DELETE FROM requests WHERE id = ?').run(id);
  return target;

}

function resolveUserId(name) {
  if (!name) name = 'ไม่ระบุชื่อ';

  const found = db.prepare('SELECT id FROM users WHERE name = ?').get(name);
  if (found) return Number(found.id);

  const slug = Date.now().toString(36);
  // แยกบรรทัดสั่ง run เพื่อความชัวร์ในการดึง lastInsertRowid
  const result = db.prepare('INSERT INTO users (name, department, email) VALUES (?, ?, ?)')
    .run(name, 'ไม่ระบุ', `user-${slug}@rmutl.ac.th`);

  // บังคับแปลง BigInt เป็น Number
  return Number(result.lastInsertRowid);
}
function nextId() {
  // ดึง ID ทั้งหมดมาเรียงลำดับตัวเลขใน JS เพื่อป้องกันปัญหา REQ-9 > REQ-10 ของ SQL
  const rows = db.prepare("SELECT id FROM requests WHERE id LIKE 'REQ-%'").all();
  if (!rows || rows.length === 0) return 'REQ-001';

  const maxNum = rows.reduce((max, row) => {
    const num = Number(String(row.id).replace('REQ-', ''));
    return !isNaN(num) && num > max ? num : max;
  }, 0);

  return `REQ-${String(maxNum + 1).padStart(3, '0')}`;
}
