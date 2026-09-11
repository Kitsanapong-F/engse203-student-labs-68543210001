const REQUEST_TYPES = ['แจ้งซ่อม', 'บริการบัญชีผู้ใช้', 'ขอใช้อุปกรณ์', 'อื่น ๆ'];
const PRIORITIES = ['normal', 'urgent'];

/** ตัวช่วยอ่านข้อความอย่างปลอดภัย — ให้มาแล้ว */
function readText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * TODO W06-M2 (CP04) · ตรวจ body ก่อนถึง controller
 *
 * เกณฑ์ที่ต้องตรวจ
 *   requesterName  ต้องยาวอย่างน้อย 2 ตัวอักษร
 *   requestType    ต้องอยู่ใน REQUEST_TYPES
 *   location       ต้องไม่ว่าง
 *   details        ต้องยาวอย่างน้อย 10 ตัวอักษร
 *   priority       ต้องอยู่ใน PRIORITIES
 *
 * ถ้าไม่ผ่าน → res.status(400).json({ error: '...', details: [รายการที่ผิด] })
 * ถ้าผ่าน   → next()
 *
 * ⚠ ใช้ readText() ตรวจ อย่าใช้ input.requesterName?.trim().length < 2
 *    เพราะถ้าค่าเป็น undefined จะได้ false แล้วหลุดผ่านไป
 */
export function validateRequest(req, res, next) {
  const input = req.body;

  const typeofError = setTypeof(input);
  if (typeofError) {
    return res.status(400).json({ error: 'ข้อมูลคำร้องไม่ถูกต้อง', details: [typeofError] });
  }


  const errors = [
    setName(input),
    setType(input),
    setDetails(input),
    setLocation(input),
    setPriority(input),
  ].filter(Boolean);

  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลคำร้องไม่ถูกต้อง', details: errors });
  }
  next();
}

export function setTypeof(input) {
  if (!input || typeof input !== 'object') {
    return 'ต้องส่งข้อมูลคำร้องมาด้วย';
  }
}

export function setName(input) {
  if (readText(input.requesterName).length < 2) {
    return 'ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร';
  }
}

export function setType(input) {
  if (!REQUEST_TYPES.includes(input.requestType)) {
    return 'ประเภทคำร้องไม่ถูกต้อง';
  }
}

export function setDetails(input) {
  if (readText(input.details).length < 10) {
    return 'รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร';
  }
}

export function setLocation(input) {
  if (!readText(input.location)) {
    return 'กรุณาระบุสถานที่';
  }
}

export function setPriority(input) {
  if (!PRIORITIES.includes(input.priority)) {
    return 'ความเร่งด่วนต้องเป็น normal หรือ urgent';
  }
}

