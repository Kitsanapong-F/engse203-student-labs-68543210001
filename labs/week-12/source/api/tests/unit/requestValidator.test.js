import { describe, test, expect } from 'vitest';
import { validateRequestInput, isValidStatus } from '../../src/validators/requestValidator.js';
import { AppError, asyncHandler, notFound, errorHandler } from '../../src/middleware/errorHandler.js';
/**
 * Unit test — ทดสอบ pure function โดยตรง ไม่ต้องเปิด server ไม่ต้องมีฐานข้อมูล
 * กรณีทดสอบมาจากตาราง TEST_CASES.md (CP44)
 *
 * รัน:  npm test            (ครั้งเดียว)
 *       npm run test:watch  (รันใหม่ทุกครั้งที่บันทึกไฟล์)
 */

// ข้อมูลที่ถูกต้องทุกช่อง — แต่ละ test เปลี่ยนทีละช่องเพื่อให้รู้ว่าพังเพราะอะไร
const valid = {
  requesterName: 'สมชาย ใจดี',
  requestType: 'แจ้งซ่อม',
  location: 'ห้อง 301',
  details: 'แอร์ไม่เย็นตั้งแต่เช้า',
  priority: 'normal',
};
const withField = (patch) => ({ ...valid, ...patch });

describe('validateRequestInput — ข้อมูลถูกต้อง', () => {
  test('ทุกช่องถูกต้อง → ไม่มี error', () => {
    expect(validateRequestInput(valid)).toEqual([]);
  });
});

describe('validateRequestInput — รายละเอียด (ค่าขอบ 10 ตัวอักษร)', () => {
  test('9 ตัวอักษร → error (ต่ำกว่าขอบ 1)', () => {
    expect(validateRequestInput(withField({ details: '123456789' }))).toHaveLength(1);
  });

  // 🏫 TODO W12-UNIT (CP45): เพิ่มกรณีจากตาราง TEST_CASES.md ให้ครบ
  //   - 10 ตัวอักษรพอดี → ผ่าน          ← ค่าขอบ
  //   - 11 ตัวอักษร → ผ่าน
  //   - ช่องว่างล้วน → error
  //   ⚠ ถ้า test ข้อไหน fail อย่าเพิ่งแก้ test — อ่านโค้ดใน validator ก่อน
  test('10 ตัวอักษร → ผ่าน', () => {
    expect(validateRequestInput(withField({ details: '1234567890' }))).toEqual([]);
  });

  test('11 ตัวอักษร → ผ่าน (เกินขอบ 1)', () => {
    expect(validateRequestInput(withField({ details: '12345678901' }))).toEqual([]);
  });

  test('ช่องว่างล้วนถูกตัดทิ้งก่อนนับ → error', () => {
    expect(validateRequestInput(withField({ details: '            ' }))).toHaveLength(1);
  });
});

describe('isValidStatus', () => {
  test.each(['pending', 'in-progress', 'completed'])('"%s" → true', (s) => {
    expect(isValidStatus(s)).toBe(true);
  });

  test.each(['done', 'in progress', '', undefined])('%j → false', (s) => {
    expect(isValidStatus(s)).toBe(false);
  });
});


// 🏫 TODO W12-UNIT (CP45): เพิ่ม describe อื่น ๆ
//   - ชื่อผู้แจ้ง 1 ตัว / 2 ตัว
//   - ประเภทคำร้องนอกรายการ · priority "high"
//   - input ผิดรูปแบบ (null · array · ตัวเลข)  ← ลองใช้ test.each([...])
//   - isValidStatus('pending') / isValidStatus('done')
describe('validateRequestInput — ชื่อผู้แจ้ง (ค่าขอบ 2 ตัวอักษร)', () => {
  test('1 ตัวอักษร → error', () => {
    expect(validateRequestInput(withField({ requesterName: 'ก' }))).toHaveLength(1);
  });
  test('2 ตัวอักษร → ผ่าน', () => {
    expect(validateRequestInput(withField({ requesterName: 'กข' }))).toEqual([]);
  });
});

describe('validateRequestInput — ข้อมูลผิดรูปแบบ', () => {
  test.each([null, undefined, 'text', 42, []])('input = %j → error เดียว', (input) => {
    expect(validateRequestInput(input)).toEqual(['ต้องส่งข้อมูลคำร้องมาด้วย']);
  });
  test('ผิดหลายช่องพร้อมกัน → ได้ error ครบทุกช่อง', () => {
    expect(validateRequestInput({})).toHaveLength(5);
  });

test.each(['แจ้งซ่อม', 'บริการบัญชีผู้ใช้', 'ขอใช้อุปกรณ์', 'อื่น ๆ'])(
    'ประเภทคำร้อง "%s" ถูกต้อง → ไม่มี error',
    (requestType) => {
      expect(validateRequestInput(withField({ requestType }))).toEqual([]);
    }
  );
});
describe('validateRequestInput — ประเภทคำร้อง (requestType)', () => {
  test.each(['แจ้งซ่อม', 'บริการบัญชีผู้ใช้', 'ขอใช้อุปกรณ์', 'อื่น ๆ'])(
    'ประเภทคำร้อง "%s" ในรายการ → ผ่าน',
    (requestType) => {
      expect(validateRequestInput(withField({ requestType }))).toEqual([]);
    }
  );

  test.each(['ขอใช้ห้อง', 'ติดตั้งโปรแกรม', '', null])(
    'ประเภทคำร้อง %j อยู่นอกรายการ → error',
    (requestType) => {
      expect(validateRequestInput(withField({ requestType }))).toContain('ประเภทคำร้องไม่ถูกต้อง');
    }
  );
});

describe('validateRequestInput — สถานที่ (location)', () => {
  test.each(['', '    ', null, undefined])(
    'สถานที่ %j (ว่าง/ช่องว่างล้วน) → error',
    (location) => {
      expect(validateRequestInput(withField({ location }))).toContain('กรุณาระบุสถานที่');
    }
  );
});

describe('validateRequestInput — ระดับความสำคัญ (priority)', () => {
  test('priority "urgent" → ผ่าน', () => {
    expect(validateRequestInput(withField({ priority: 'urgent' }))).toEqual([]);
  });

  test.each(['high', 'low', '', null, 123])(
    'priority %j อยู่นอกรายการ → error',
    (priority) => {
      expect(validateRequestInput(withField({ priority }))).toContain('ความเร่งด่วนต้องเป็น normal หรือ urgent');
    }
  );
});

describe('validateRequestInput — ทดสอบ readText กับชนิดข้อมูลที่ไม่ใช่ string', () => {
  test('ส่งตัวเลขแทนข้อความใน field ต่าง ๆ → นับความยาวเป็น 0 และติด error', () => {
    const input = withField({
      requesterName: 123,
      location: 456,
      details: 789,
    });
    const errors = validateRequestInput(input);
    expect(errors).toContain('ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร');
    expect(errors).toContain('กรุณาระบุสถานที่');
    expect(errors).toContain('รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร');
  });
});

describe('errorHandler middleware unit test', () => {
  test('AppError กำหนด status และ message ได้ถูกต้อง', () => {
    const errDefault = new AppError('ข้อผิดพลาดทั่วไป');
    expect(errDefault.status).toBe(500);
    expect(errDefault.message).toBe('ข้อผิดพลาดทั่วไป');

    const errCustom = new AppError('ไม่พบข้อมูล', 404);
    expect(errCustom.status).toBe(404);
    expect(errCustom.message).toBe('ไม่พบข้อมูล');
  });

  test('asyncHandler ส่ง error ไปยัง next callback เมื่อเกิด reject', async () => {
    let capturedError = null;
    const next = (err) => { capturedError = err; };
    const throwingFn = async () => { throw new Error('พังในการทำงาน async'); };

    const wrapped = asyncHandler(throwingFn);
    await wrapped({}, {}, next);

    expect(capturedError).not.toBeNull();
    expect(capturedError.message).toBe('พังในการทำงาน async');
  });

  test('notFound ส่ง response 404 พร้อม JSON ข้อความ', () => {
    let responseData = null;
    let statusCode = null;

    const req = { method: 'POST', originalUrl: '/api/unknown' };
    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(data) {
        responseData = data;
        return this;
      },
    };

    notFound(req, res);
    expect(statusCode).toBe(404);
    expect(responseData.error).toContain('ไม่พบเส้นทาง POST /api/unknown');
  });

  test('errorHandler จัดการ error status ต่ำกว่า 500', () => {
    let statusCode = null;
    let responseData = null;

    const err = new AppError('ข้อมูลไม่ถูกต้อง', 400);
    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(data) {
        responseData = data;
        return this;
      },
    };

    errorHandler(err, {}, res, () => {});
    expect(statusCode).toBe(400);
    expect(responseData.error).toBe('ข้อมูลไม่ถูกต้อง');
  });

  test('errorHandler จัดการ error status 500 ขึ้นไป', () => {
    let statusCode = null;
    let responseData = null;

    const err = new Error('Database connection failed');
    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(data) {
        responseData = data;
        return this;
      },
    };

    errorHandler(err, {}, res, () => {});
    expect(statusCode).toBe(500);
    expect(responseData.error).toBe('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  });
});
