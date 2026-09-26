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

/**
 * W10-TEST (🏠 CP33) · เขียน test อย่างน้อย 6 เคส ที่ยิงเข้าฐานข้อมูลจริง
 */
describe('API Requests Integration Tests', () => {
  // เคสที่ 1: GET /api/requests → 200 และได้ array
  test('1. GET /api/requests คืน 200 และได้ array', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });

  // เคสที่ 2: คืน requesterName ไม่ใช่ requester_id
  test('2. ข้อมูลที่คืนต้องมี requesterName และไม่มี requester_id', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    if (res.body.length > 0) {
      const item = res.body[0];
      assert.ok('requesterName' in item);
      assert.equal('requester_id' in item, false);
    }
  });

  // เคสที่ 3: GET /:id พบ → 200 · ไม่พบ → 404
  test('3. GET /:id พบคืน 200 และไม่พบคืน 404', async () => {
    const resFound = await request(app).get('/api/requests/REQ-001');
    assert.equal(resFound.status, 200);
    assert.equal(resFound.body.id, 'REQ-001');

    const resNotFound = await request(app).get('/api/requests/REQ-999999');
    assert.equal(resNotFound.status, 404);
  });

  // เคสที่ 4: POST ถูกต้อง → 201
  test('4. POST ข้อมูลถูกต้อง คืน 201 พร้อมข้อมูลที่สร้าง', async () => {
    const payload = {
      requesterName: 'สมชาย สายเทส',
      requestType: 'อุปกรณ์ IT',
      location: 'ห้อง 401',
      details: 'ขอคีย์บอร์ดใหม่สำหรับการทดสอบระบบ',
      priority: 'high'
    };
    const res = await request(app).post('/api/requests').send(payload);
    assert.equal(res.status, 201);
    assert.equal(res.body.requesterName, payload.requesterName);
    assert.ok(res.body.id);
  });

  // เคสที่ 5: POST ไม่ครบ → 400
  test('5. POST ข้อมูลไม่ครบ คืน 400 Validation Error', async () => {
    const invalidPayload = { requesterName: 'สมชาย' }; // ข้อมูลไม่ครบ
    const res = await request(app).post('/api/requests').send(invalidPayload);
    assert.equal(res.status, 400);
  });

  // เคสที่ 6: ยิง SQL injection ผ่าน ?status= แล้วต้องไม่หลุด
  test('6. ยิง SQL Injection ผ่าน query parameter ?status= แล้วต้องไม่หลุด', async () => {
    const injectionQuery = "pending' OR '1'='1";
    const res = await request(app).get(`/api/requests?status=${encodeURIComponent(injectionQuery)}`);
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.equal(res.body.length, 0); // ต้องไม่มีข้อมูลหลุดออกมา
  });
});
