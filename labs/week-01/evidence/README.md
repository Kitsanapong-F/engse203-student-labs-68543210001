# Week 01 Evidence

---
## ผล `node --version`, `npm --version`, `git --version`

node --version
![ผลการรัน Node](../../../image/image1.png)

npm --version
![ผลการรัน npm](../../../image/image2.png)

git --version
![ผลการรัน Git](../../../image/image3.png)

---

## Screenshot โปรแกรม `hello.js`
![alt text](../../../image/image5.png)
ผลการรัน
![alt text](../../../image/image4.png)
---

## Original Repository URL และ Commit SHA
🔗 Original Repository URL : **[https://github.com/Kitsanapong-F/engse203-lab01-68543210001](https://github.com/Kitsanapong-F/engse203-lab01-68543210001)**
Commit SHA : 8b5821b5370c4b6859bde5552e2620d6144b58ba

---
## Git Workflow
```bash
# 1.สร้าง branch ใหม่จาก main
git checkout -b feature/......

# 2.แก้ไข/เพิ่มโค้ด แล้ว commit
git add .
git commit -m "feat: add dashboard modules"

# 3.push branch ขึ้น GitHub
git push origin feature/......

# 4.เปิด Pull Request บน GitHub จาก feature/...... -> main
#    รอ review/ตรวจสอบ แล้วกด Merge

# 5.กลับมาที่ main และ pull โค้ดล่าสุด
git checkout main
git pull origin main
```
---
