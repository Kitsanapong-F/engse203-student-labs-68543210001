# LAB 4 Evidence

เก็บภาพที่ไม่เปิดเผยข้อมูลส่วนบุคคลเกินจำเป็น เช่น:

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | แสดงรายการเริ่มต้นและ summary ถูกต้องครบถ้วน, console ไม่มี error | Pass | <img src="image/week4/tc-01.png" |
| TC-02 Controlled input | ทุก input/select field เปลี่ยนแปลงค่าตาม state ได้อย่างถูกต้องและลื่นไหล | Pass |<img src="image/week4/tc-02.png" |
| TC-03 Invalid | ระบบบล็อกการส่งข้อมูลเมื่อฟิลด์ไม่ครบ/ไม่ถูกต้อง พร้อมแสดงข้อความแจ้งเตือนใกล้ช่องกรอกข้อมูล | Pass| <img src="image/week4/tc-03.png" |
| TC-04 Valid add |เพิ่มรายการสถานะ pending สำเร็จ, summary อัปเดตตัวเลขทันที | Pass |<img src="image/week4/tc-04.png" |
| TC-05 Filter | กรองแสดงเฉพาะรายการตามสถานะที่เลือก (เช่น pending, in-progress, completed) ได้อย่างถูกต้อง |Pass |<img src="image/week4/tc-05.png" |
| TC-06 All | ปุ่มแสดงทั้งหมด (All) สามารถแสดงรายการทุกสถานะกลับมาครบถ้วน | Pass | <img src="image/week4/tc-06.png"|
| TC-07 Empty | แสดงข้อความแจ้งเตือนเมื่อทำการกรองแล้วไม่พบข้อมูลหรือรายการว่างเปล่า | Pass| <img src="image/week4/tc-07.png" |
| TC-08 Delete |ลบรายการตรงตาม ID ที่ระบุ, รายการใน list และตัวเลขใน summary อัปเดตถูกต้อง| Pass | <img src="image/week4/tc-08.png" |
| TC-09 Mobile |แสดงผลหน้าจอขนาด 375px ได้สมบูรณ์ ไม่มีปัญหา Horizontal Scroll | Pass |<img src="image/week4/tc-09.png" |
| TC-10 Keyboard | รองรับการนำทางด้วยปุ่ม Tab (Keyboard Navigation) มีการแสดง Focus-visible ชัดเจน และเชื่อมโยง label กับ input ถูกต้อง | Pass |<img src="image/week4/tc-10.png" |
| TC-11 Build | รันคำสั่ง npm run build สำเร็จ ไม่มี Error และโฟลเดอร์ dist/ พร้อมใช้งาน | pass | <img src="<image/week4/tc-11.png" |
| TC-12 Pages | TODO | TODO | TODO |

## Screenshots

- Desktop: `evidence/desktop.png`
     <img src="<image/week4/desktop.png"
- Mobile 375px: `evidence/mobile-375.png`
    <img src="<image/week4/tc-09.png"
- Validation/empty state:
    <img src="image/week4/tc-03.png"
- empty state:
    <img src="image/week4/tc-07.png"

เชื่อมชื่อไฟล์เหล่านี้ใน README หลักของ repository นักศึกษา

