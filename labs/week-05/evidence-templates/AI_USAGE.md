# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Gemini |ช่วยหาสาเหตุและวิธีแก้ปัญหาหน้าเว็บพัง (ขาว/ค้าง) เมื่อข้อมูลใน localStorage เสียหาย (เช่น รูปแบบ JSON ผิด หรือ ID ซ้ำกัน) | วิธีการเคลียร์ค่าใน Local Storage และการทำความเข้าใจ Data Layer / Auto-Recovery | source review / runtime test / ไม่เกี่ยวข้อง |นำวิธีการเคลียร์ Local Storage มาใช้ทดสอบระบบ (Test Scenario) ว่าระบบกู้คืนข้อมูลได้จริงหรือไม่ |

คำรับรอง:

- [x] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [x] ตรวจ source และรัน test ด้วยตนเอง
- [x] อธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้
