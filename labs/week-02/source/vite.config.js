JavaScript
import { defineConfig } from "vite";

const repositoryName = "engse203-student-labs-68543210001";

export default defineConfig({
  // ต้องตรวจสอบให้มั่นใจว่าต่อ Path ไปถึงโฟลเดอร์แล็บสัปดาห์นั้น ๆ เสมอ
  base: `/${repositoryName}/labs/week-02/`,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
