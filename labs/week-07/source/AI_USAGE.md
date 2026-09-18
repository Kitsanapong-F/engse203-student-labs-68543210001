# AI Usage Record (บันทึกการใช้งาน AI)

## 1. คำถามหรือ Prompt ที่ใช้ถาม AI
* สอบถามสาเหตุของ Error `node: .env: not found` ขณะรัน `npm run dev`
* ให้ช่วยแต่ง CSS สำหรับ `<select>` และปรับ Layout ของ `RequestCard.jsx`
* สอบถามวิธีเว้นระยะห่างระหว่างปุ่มลบกับ Dropdown และแก้ปัญหาปุ่มดันตกบรรทัด
* สอบถามวิธีผูก `onChange` กับ `<select>` และการจัดการ State `isUpdating` / `error` ตามเงื่อนไขโจทย์
* สอบถามการปรับใช้ฟังก์ชัน `handleChangeStatus` ใน `RequestDetailPage.jsx`
* ให้ช่วยอธิบายและตรวจทานการเปลี่ยน Logger เป็น `morgan` ใน `app.js` (CP14 - TODO W07-A2)

---

## 2. ส่วนของคำตอบที่นำมาใช้ (AI-Generated Code / Guidance)
* โครงสร้าง CSS Flexbox สำหรับจัดวางปุ่มลบและ Dropdown (`gap`, `white-space: nowrap`)
* โครงสร้างฟังก์ชัน `handleChangeStatus` และการใช้ `isUpdating` เพื่อสั่ง `disabled` ปุ่ม/select ระหว่างรอ API
* ตัวอย่างการนำเข้าและเรียกใช้งาน `morgan` ใน `app.js`:
  ```javascript
  app.use(morgan(config.isProduction ? 'combined' : 'dev'));
