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
App [State: requests, statusFilter]
├── AppHeader [Props: title, subtitle]
├── SummaryPanel [Props: summary]
│   └── SummaryCard (map) [Key: summary field name]
├── RequestForm [Local State: formData, errors, feedback]
│   └── Props Received: onAddRequest
└── section.panel (Request List Section)
    ├── FilterBar [Props: value, onFilterChange]
    └── RequestList [Props: requests, onDeleteRequest]
        └── RequestCard (map) [Key: request.id, Props: request, onDeleteRequest]

### 1. `App` (State Owner)
ทำหน้าที่เป็นศูนย์กลางในการเก็บและจัดการ State หลักของแอปพลิเคชัน เพื่อให้ Component ลูกสามารถแชร์ข้อมูลและอัปเดตร่วมกันได้
* **State:**
  * `requests` (`Array<Object>`): อาเรย์เก็บรายการคำขอทั้งหมดในระบบ
  * `statusFilter` (`String`): สตริงเก็บสถานะที่ใช้กรองรายการปัจจุบัน
* **Handlers / Functions:**
  * `handleAddRequest(newRequest)`: ฟังก์ชันสำหรับเพิ่มคำขอใหม่ลงใน `requests`
  * `handleDeleteRequest(id)`: ฟังก์ชันสำหรับลบคำขอออกจาก `requests` ตาม `id`
  * `handleFilterChange(newFilter)`: ฟังก์ชันสำหรับอัปเดตค่าตัวกรอง `statusFilter`

---

### 2. ส่วนหัวและสรุปข้อมูล (Header & Summary)
* **`AppHeader`**
  * **Props:** `title`, `subtitle`
  * **หน้าที่:** รับข้อความหัวข้อและคำอธิบายมาแสดงผล
* **`SummaryPanel` & `SummaryCard`**
  * **Props:** `summary` (ข้อมูลตัวเลขสถิติภาพรวม เช่น จำนวนคำขอทั้งหมด, กำลังดำเนินการ, เสร็จสิ้น)
  * **หน้าที่:** วนลูปสร้างการ์ดสรุปผลด้วย `.map()` ตามฟิลด์ข้อมูลที่ได้รับ

---

### 3. ส่วนจัดการฟอร์ม (Form Section)
* **`RequestForm`**
  * **Local State:**
    * `formData`: ข้อมูลฟอร์มที่ผู้ใช้กำลังกรอก
    * `errors`: ข้อผิดพลาดในการตรวจสอบข้อมูล (Validation)
    * `feedback`: ข้อความแจ้งเตือนสถานะการบันทึก
  * **Props Received:**
    * `onAddRequest`: รับฟังก์ชันมาจาก `App` เพื่อส่งข้อมูลคำขอใหม่กลับไปบันทึก

---

### 4. ส่วนแสดงและกรองรายการ (List & Filter Section)
* **`FilterBar`**
  * **Props:**
    * `value`: ค่าสถานะปัจจุบัน (`statusFilter`)
    * `onFilterChange`: ฟังก์ชันสำหรับเปลี่ยนค่าตัวกรองเมื่อผู้ใช้เลือกสถานะ
* **`RequestList` & `RequestCard`**
  * **Props:**
    * `requests`: รายการคำขอที่ผ่านการกรองสถานะแล้ว
    * `request`: ข้อมูลคำขอเฉพาะแต่ละรายการ
    * `onDeleteRequest`: ฟังก์ชันส่งต่อเพื่อใช้ลบข้อมูลคำขอนั้น ๆ
  * **หน้าที่:** วนลูป `.map()` แสดงผลรายการคำขอในรูปแบบการ์ด พร้อมปุ่มจัดการลบข้อมูล
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
## Week 03 → Week 04 Reflection

TODO: เปรียบเทียบ DOM mutation กับ State-driven UI 3–5 ประโยค
กระบวนการควบคุมและอัปเดตหน้าจอ:

Week 03 (DOM-driven): ทำงานแบบ Imperative (สั่งการทีละขั้นตอน) โดยต้องคอยดึงข้อมูลผ่าน FormData/querySelector, จัดการแก้ไขอาร์เรย์ด้วยตัวเอง และต้องเรียกฟังก์ชันอัปเดตหน้าจอ (renderRequests(), updateSummary()) ทุกครั้ง ซึ่งเสี่ยงต่อปัญหาลืมซิงค์จนทำให้ UI ไม่ตรงกับข้อมูลจริง

Week 04 (State-driven): ทำงานแบบ Declarative โดยอาศัยการเก็บข้อมูลไว้ที่ state และอัปเดตผ่านฟังก์ชันแบบ immutable เมื่อสถานะเปลี่ยน React จะจัดการประมวลผล Re-render, คำนวณ Summary และกรองข้อมูลให้อัตโนมัติ

ข้อดีเชิงสถาปัตยกรรม: โค้ดมีความสั้นกระชับและเป็นระเบียบมากขึ้น พฤติกรรมของแอปพลิเคชันคาดเดาได้ง่ายขึ้นตามหลักการที่ว่า "เมื่อ State เปลี่ยน UI จะเปลี่ยนตามเสมอ"

ลักษณะของปัญหาและข้อผิดพลาดที่เปลี่ยนไป:

ในขณะที่ Week 03 มักเจอปัญหาความไม่สอดคล้องระหว่างข้อมูลกับหน้าจอ

ใน Week 04 ปัญหาจะเปลี่ยนรูปแบบไปเป็นข้อจำกัดทางเทคนิคเฉพาะของ React เช่น Controlled/Uncontrolled input conflict, การเรียงลำดับการ spread object พลาดจนค่าฟิลด์ถูกทับด้วยค่าว่าง, รวมถึงการใช้ key ซ้ำกันใน List ซึ่งเป็นหัวใจสำคัญของกลไก Reconciliation ในการจัดการ DOM ของ Reac
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
