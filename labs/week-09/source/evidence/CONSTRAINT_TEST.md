##  ผลการทดสอบ Constraint (CP25)


### ① Foreign Key Constraint
* **คำสั่งที่ทดสอบ:**
  ```sql
  INSERT INTO requests (id, requester_id, request_type, location, details)
  VALUES ('REQ-TEST-FK', 99999, 'แจ้งซ่อม', 'ห้องทดสอบ', 'ทดสอบ Foreign Key');
* ผลลัพธ์ = FOREIGN KEY constraint failed
### ② Check Constraint
* **คำสั่งที่ทดสอบ:**
  ```sql
  INSERT INTO requests (id, requester_id, request_type, location, details, status)
  VALUES ('REQ-TEST-CK', 1, 'แจ้งซ่อม', 'ห้องทดสอบ', 'ทดสอบ Check', 'ยกเลิก');
* ผลลัพธ์ = CHECK constraint failed
### ③ Unique Constraint
* **คำสั่งที่ทดสอบ:**
  ```sql
  INSERT INTO users (name, department, email)
  VALUES ('สมชาย อีกคน', 'วิศวกรรมซอฟต์แวร์', 'somchai@rmutl.ac.th');
* ผลลัพธ์ = UNIQUE constraint failed: users.email
### ④ Primary Key / Unique ID
* **คำสั่งที่ทดสอบ:**
  ```sql
  INSERT INTO requests (id, requester_id, request_type, location, details)
  VALUES ('REQ-001', 1, 'แจ้งซ่อม', 'ห้องทดสอบ', 'ทดสอบ ID ซ้ำ');
* ผลลัพธ์ = UNIQUE constraint failed: requests.id
### ⑤ Not Null Constraint
* **คำสั่งที่ทดสอบ:**
  ```sql
  INSERT INTO requests (id, requester_id, request_type, details)
  VALUES ('REQ-TEST-NN', 1, 'แจ้งซ่อม', 'ทดสอบลืมใส่ location');
* ผลลัพธ์ = NOT NULL constraint failed: requests.location

