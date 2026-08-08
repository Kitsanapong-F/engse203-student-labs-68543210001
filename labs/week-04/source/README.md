# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: กฤษณพงศ์ ชัยสุ
- รหัสนักศึกษา: 68543210001-2
- Section: 1

## URLs

- Repository: TODO
- Pull Request: TODO
- GitHub Pages: TODO

## Component Tree

```text
TODO: วาด App → child components และระบุ state owner
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

TODO: อธิบายว่าใคร owns requests/filter/form state, props ไหลลงตรงไหน และ callback ไหลกลับตรงไหน

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | TODO | TODO | TODO |
| TC-02 Controlled input | TODO | TODO | TODO |
| TC-03 Invalid | TODO | TODO | TODO |
| TC-04 Valid add | TODO | TODO | TODO |
| TC-05 Filter | TODO | TODO | TODO |
| TC-06 All | TODO | TODO | TODO |
| TC-07 Empty | TODO | TODO | TODO |
| TC-08 Delete | TODO | TODO | TODO |
| TC-09 Mobile | TODO | TODO | TODO |
| TC-10 Keyboard | TODO | TODO | TODO |
| TC-11 Build | TODO | TODO | TODO |
| TC-12 Pages | TODO | TODO | TODO |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: TODO

## Week 03 → Week 04 Reflection

TODO: เปรียบเทียบ DOM mutation กับ State-driven UI 3–5 ประโยค

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้”
เครื่องมือหรือแหล่งที่ใช้
Gemini (AI Assistant)

prompt/คำถามสำคัญ

"สอนทำพร้อมอธิบายหลักการ" (พร้อมแนบภาพปัญหาโครงสร้าง Workspace เทียบกับข้อกำหนดใน README.md)

สอบถามวิธีแก้ปัญหาจาก Error log: Error: Week ไม่ถูกต้อง: "undefined" (ปัญหาจากการรันสคริปต์ import:source)

สอบถามวิธีแก้ปัญหาจาก Error log: Error: publish source ต้องมี index.html ที่ root (ปัญหาจากการรันสคริปต์ import:publish)

ส่วนที่นำมาปรับ

ปรับโครงสร้างโฟลเดอร์: ลบ node_modules ออกจาก source/ และย้าย evidence/ ให้อยู่ในระดับที่ถูกต้องตามข้อกำหนดของ Workspace

ปรับแก้คำสั่ง Import Source: เพิ่มการระบุชื่อสัปดาห์ต่อท้ายคำสั่งเป็น npm run import:source week-04

เพิ่มขั้นตอนการ Build: ทำการรัน npm install และ npm run build ในโฟลเดอร์ source เพื่อให้ Vite ทำการแพ็กเกจไฟล์โปรเจกต์ไปไว้ในโฟลเดอร์ dist/

ปรับแก้คำสั่ง Import Publish: เพิ่มพารามิเตอร์ระบุเส้นทาง (Path) ของไฟล์ที่ Build เสร็จแล้ว เพื่อให้สคริปต์หาไฟล์ index.html เจอ โดยใช้คำสั่ง npm run import:publish week-04 labs/week-04/source/dist

วิธีที่ตรวจสอบความถูกต้อง

ตรวจสอบความสอดคล้องของโครงสร้างโฟลเดอร์และไฟล์กับกฎที่ระบุไว้ใน README.md

วิเคราะห์และตรวจสอบจาก Error Message ใน Terminal เพื่อหาสาเหตุที่แท้จริงของปัญหา (เช่น สคริปต์ต้องการพารามิเตอร์เพิ่มเติม)

สังเกตผลลัพธ์จาก Build Log ของ Vite ซึ่งยืนยันว่ามีการสร้างไฟล์ index.html ในโฟลเดอร์ dist/ ได้สำเร็จ

ทดสอบรันคำสั่งแก้ไขจริงใน Terminal เพื่อยืนยันว่าสามารถรันผ่านโดยไม่เกิด Error
