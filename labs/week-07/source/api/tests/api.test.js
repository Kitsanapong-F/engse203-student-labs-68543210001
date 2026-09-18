import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => {
  await loadSeed();
  app = createApp();
});

const validRequest = {
  requesterName: 'ทดสอบ ระบบ',
  requestType: 'แจ้งซ่อม',
  location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง',
  priority: 'normal',
};

/**
 * TODO W07-TEST (🏠 CP16) · เขียน test อย่างน้อย 6 เคส
 *
 * ที่ต้องมี
 *   1. GET /api/requests            → 200 และได้ array
 *   2. GET /api/requests/:id พบ      → 200
 *   3. GET /api/requests/:id ไม่พบ   → 404
 *   4. POST ข้อมูลถูกต้อง            → 201 และ status เป็น pending
 *   5. POST ข้อมูลไม่ครบ             → 400
 *   6. CORS header ตอบ origin ที่อนุญาต
 *
 * รันด้วย: npm test
 * ตัวอย่างโครง (ลบคอมเมนต์นี้แล้วเขียนจริง)
 */
describe('Campus API Tests', () => {

  test('1. GET /api/requests คืนรายการทั้งหมด พร้อม status 200', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });


  test('2. GET /api/requests/:id คืนข้อมูลคำร้องตาม ID ที่มีอยู่', async () => {
    const res = await request(app).get('/api/requests/REQ-001');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 'REQ-001');
  });


  test('3. GET /api/requests/:id คืน 404 เมื่อไม่พบคำร้อง', async () => {
    const res = await request(app).get('/api/requests/REQ-999');
    assert.equal(res.status, 404);
  });


  test('4. POST /api/requests สร้างคำร้องใหม่เมื่อข้อมูลถูกต้อง', async () => {
    const newRequest = {
      requesterName: 'ทดสอบ ระบบ',
      requestType: 'แจ้งซ่อม',
      location: 'C3-401',
      details: 'รายละเอียดยาวพอสมควรจริง',
      priority: 'normal',
    };

    const res = await request(app)
      .post('/api/requests')
      .send(newRequest);

    assert.equal(res.status, 201);
    assert.equal(res.body.status, 'pending');
    assert.ok(res.body.id);
  });


  test('5. POST /api/requests คืน 400 เมื่อข้อมูลไม่ครบถ้วน', async () => {
    const invalidRequest = {
      requesterName: 'สมชาย ใจดี',
    };

    const res = await request(app)
      .post('/api/requests')
      .send(invalidRequest);

    assert.equal(res.status, 400);
  });


  test('6. คืนค่า Access-Control-Allow-Origin header ตรงตามที่กำหนด', async () => {
    const res = await request(app)
      .get('/api/requests')
      .set('Origin', 'http://localhost:5173');

    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });
});
