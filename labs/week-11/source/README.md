# Campus Service — Full-Stack (Week 11 · starter)

> 🏠 TODO W11-README (CP40) — เขียน README นี้ใหม่ให้ครบ:
> สถาปัตยกรรม 3 ชั้น · วิธีรัน dev/production · env vars · การตัดสินใจออกแบบ

ระบบตั้งต้นจากสัปดาห์ที่ 10 (React + Express + SQLite)
งานสัปดาห์นี้: ทำให้ **พร้อมใช้จริง** — config, health check, error handling, build, deploy

## ภาพรวม
```
1. ภาพรวม
Campus Service เป็นระบบแจ้งและติดตามคำร้องบริการในมหาวิทยาลัย ผู้ใช้สร้างคำร้อง ดูรายการ กรอง ดูรายละเอียด เปลี่ยนสถานะ และลบได้
```
|  ชั้น | เทคโนโลยี  |
| :--- | :--- |
| **Frontend** | React , React Router , Vite |
| **API** | Node.js ≥ 22.12, Express , `cors`, `morgan`, `dotenv` |
| **Database** | SQLite |

##  สถาปัตยกรรม 3 ชั้น

```text
┌───────┐   HTTP   ┌─────────┐    SQL    ┌────────┐
│ React │ ───────> │ Express │ ────────> │ SQLite │
└───────┘   JSON   └─────────┘    rows   └────────┘
```

| ชั้น | หน้าที่ | โฟลเดอร์ |
| :--- | :--- | :--- |
| **Frontend** | pages, components, `services/apiClient.js` | `frontend/src/` |
| **API** | `routes` → `middleware` → `controllers` → `services` | `api/src/` |
| **Database** | `schema.sql`, `campus.db` | `api/data/` |

##  วิธีรัน ใน dev
# terminal 1  api
```
1.เข้าไปยัง ที่อยู่ของ api โดย cd api
2.ใช้ คำสั้ง npm install เพื่อที่ จะติดตั้ง Packages เข้ามาไว้ในโปรเจกต์สามารถเรียกใช้งานโมดูลได้
3.ใช้ คำสั้งcp .env.example .env เพื่อสร้างไฟล์ Environment Variables ของเครื่องตนเอง
4.ใช้ คำสั้งnpm run db:setup เพื่อสร้างตารางข้อมูล
5.ใช้ คำสั้งnpm run dev เพื่อใช้"node --disable-warning=ExperimentalWarning --watch --env-file=.env src/server.js"
จะได้ port 3001

```
# terminal 2 frontend
```
1.เข้าไปยัง ที่อยู่ของ frontend โดย cd frontend
2.ใช้ คำสั้ง npm install เพื่อที่ จะติดตั้ง Packages เข้ามาไว้ในโปรเจกต์สามารถเรียกใช้งานโมดูลได้
3.ใช้ คำสั้งcp cp .env.example .env.local เพื่อสร้างไฟล์ Environment Variables ของเครื่องตนเอง
4.ใช้ คำสั้งnpm run dev เพื่อใช้ "vite"
จะได้ port 5173
```
###  วิธีรัน (production) — พอร์ตเดียว
```
1.cd labs/week-11/source

2.build แบบที่ cloud ทำ (NODE_ENV=production ตั้งแต่ build)
NODE_ENV=production npm run build

3.start แบบที่ cloud ทำ (cloud กำหนดพอร์ตเอง — จำลองด้วยพอร์ตอื่นที่ไม่ใช่ 3001)
NODE_ENV=production PORT=10000 npm start

หลักการทำงาน ตอนโหมด production ตัวเซิร์ฟเวอร์ Express จะทำหน้าที่เสิร์ฟไฟล์ static จากโฟลเดอร์ `frontend/dist` ด้วยตัวเอง โดยเส้นทาง (path) ที่ไม่ขึ้นต้นด้วย `/api` จะถูกส่งไฟล์ `index.html` กลับไป เพื่อส่งต่อให้ React Router ภายใน frontend จัดการเส้นทางหน้าเว็บ
```
## Environment Variables

| ตัวแปร | ค่าเริ่มต้น | ใช้ทำอะไร |
| :--- | :--- | :--- |
| `NODE_ENV` | `development` | สลับ dev/production (log และการเสิร์ฟไฟล์) |
| `PORT` | `3001` | พอร์ตของ API |
| `CORS_ORIGIN` | `http://localhost:5173` | origin ของ frontend ที่อนุญาต |
| `DB_FILE` | `api/data/campus.db` | ตำแหน่งไฟล์ SQLite |
| `STATIC_DIR` | `frontend/dist` | โฟลเดอร์ที่ build แล้ว |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | *(ว่าง)* | ตัวเลือกเสริม ถ้าว่างจะใช้ SQLite ในเครื่อง |
| `VITE_API_BASE_URL` (frontend) | `http://localhost:3001` | URL ของ API ที่ frontend เรียก ต้องขึ้นต้นด้วย `VITE_` |
```
## การตัดสินใจออกแบบ
```
-แยก 3 ชั้น : แต่ละชั้นมีหน้าที่เดียว แก้หรือเปลี่ยนชั้นหนึ่งได้โดยไม่กระทบชั้นอื่น เช่น ถ้าเปลี่ยนฐานข้อมูลก็แก้แค่ services
-เลือก SQLite : ไม่ต้องติดตั้ง server แยก เป็นไฟล์เดียว
-config รวมที่ `config.js`:** ไม่ hardcode ค่าในโค้ด จึงเปลี่ยนค่าตาม environment ได้
เสิร์ฟพอร์ตเดียวตอน production: เลี่ยงปัญหา CORS และ deploy ง่ายขึ้น
```
