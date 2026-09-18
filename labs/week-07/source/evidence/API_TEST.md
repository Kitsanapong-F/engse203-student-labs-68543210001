**ชื่อ–รหัส:** นายกฤษณพงศ์ ชัยสุ 68543210001-2 **วันที่ทดสอบ:** 18 ก.ย. 2569

> บันทึก **ผลจริง** ที่ได้จากการรันชุดทดสอบ Automated Test (`api/tests/api.test.js` ผ่านคำสั่ง `npm test`)

---

## ผลการทดสอบ Automated Test (CP16: 6 เคส)

| # | Method | Path / หัวข้อการทดสอบ | สิ่งที่ส่งไป (Request Payload / Header) | Status ที่ควรได้ | Status ที่ได้จริง | ผลการทดสอบ | ผ่าน |
|---|---|---|---|---|---|---|:---:|
| 1 | `GET` | `/api/requests` | — | 200 | 200 | คืน Array รายการคำร้องทั้งหมด | ✓ |
| 2 | `GET` | `/api/requests/REQ-001` | — | 200 | 200 | คืน Object คำร้อง `REQ-001` ถูกต้อง | ✓ |
| 3 | `GET` | `/api/requests/REQ-999` | — | 404 | 404 | คืน `{"error": "ไม่พบคำร้องรหัส REQ-999"}` | ✓ |
| 4 | `POST` | `/api/requests` | `{ requesterName: "ทดสอบ ระบบ", requestType: "แจ้งซ่อม", location: "C3-401", details: "รายละเอียดยาวพอสมควรจริง", priority: "normal" }` | 201 | 201 | สร้างสำเร็จ ได้ ID `REQ-...` และ `status: "pending"` โดยชื่อ `requesterName` ตรงตามที่ส่ง | ✓ |
| 5 | `POST` | `/api/requests` | `{ requesterName: "-", details: "-" }` (ข้อมูลไม่ครบถ้วน/ไม่ผ่านเกณฑ์) | 400 | 400 | คืน error validation พร้อม array details | ✓ |
| 6 | `GET` | `/api/requests` (CORS) | Header `Origin: http://localhost:5173` | 200 | 200 | คืน `Access-Control-Allow-Origin: http://localhost:5173` | ✓ |

---

## ผลการรัน `npm test` จริงใน Terminal

```text
kitsanapong@DESKTOP-FHHUALR:~/workspace/engse203/engse203-student-labs-68543210001/labs/week-07/source/api$ npm test

> engse203-week06-campus-api@2.0.0 test
> node --test "tests/*.test.js"

GET /api/requests 200 1.332 ms - 1030
▶ Campus API Tests
  ✔ 1. GET /api/requests คืนรายการทั้งหมด พร้อม status 200 (14.490855ms)
GET /api/requests/REQ-001 200 0.451 ms - 321
  ✔ 2. GET /api/requests/:id คืนข้อมูลคำร้องตาม ID ที่มีอยู่ (4.381677ms)
GET /api/requests/REQ-999 404 0.294 ms - 65
  ✔ 3. GET /api/requests/:id คืน 404 เมื่อไม่พบคำร้อง (22.533134ms)
POST /api/requests 201 4.188 ms - 258
  ✔ 4. POST /api/requests สร้างคำร้องใหม่เมื่อข้อมูลถูกต้อง (22.771257ms)
POST /api/requests 400 0.402 ms - 406
  ✔ 5. POST /api/requests คืน 400 เมื่อข้อมูลไม่ครบถ้วน (16.50144ms)
GET /api/requests 200 0.307 ms - 1289
  ✔ 6. คืนค่า Access-Control-Allow-Origin header ตรงตามที่กำหนด (19.782525ms)
✔ Campus API Tests (103.801077ms)
ℹ tests 6
ℹ suites 1
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 245.508269
```

---
