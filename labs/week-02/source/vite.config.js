import { defineConfig } from "vite";

const repositoryName = "engse203-student-labs-68543210001";

export default defineConfig({
  // เติม publish/ เข้าไปที่ท้ายสุด เพื่อให้ตรงกับโครงสร้างปลายทางที่สคริปต์ของวิชาย้ายไฟล์ไปวางไว้
  base: `/${repositoryName}/labs/week-02/publish/`,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
