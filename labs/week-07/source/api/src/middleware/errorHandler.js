import { config } from '../config.js';

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/** จับ error ที่หลุดมาจากทุก route — ต้องมี 4 พารามิเตอร์ Express ถึงจะรู้ว่าเป็น error handler */
export function errorHandler(err, req, res, next) {
  // ดึงค่า statusCode จาก err.statusCode หรือ err.status (ถ้าเป็นตัวเลข)
  const statusCode = err.statusCode || (typeof err.status === 'number' ? err.status : 500);

  if (statusCode >= 500) {
    console.error('เกิดข้อผิดพลาดภายใน:', err.message);
  }

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' : err.message,
    // ส่ง stack เฉพาะตอนพัฒนาเท่านั้น
    ...(config.isProduction ? {} : { stack: err.stack?.split('\n').slice(0, 3) }),
  });
}

/** ไม่มี route ไหนตรง */
export function notFound(req, res) {
  res.status(404).json({ error: `ไม่พบเส้นทาง ${req.method} ${req.originalUrl}` });
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
