import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();

const attempts = new Map();

export function resetLoginLimiter() {
  attempts.clear();
}

router.post('/login', (req, res) => {
  const email = req.body?.email;
  const count = attempts.get(email) || 0;
  if (count >= 5) {
    return res.status(429).json({ error: 'พยายามเข้าสู่ระบบมากเกินไป กรุณารอสักครู่' });
  }

  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    if (email) attempts.set(email, count + 1);
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  if (email) attempts.delete(email);
  res.status(200).json(result);
});

export default router;
