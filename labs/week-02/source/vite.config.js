import { defineConfig } from "vite";

// ปรับตามชื่อ Repository ปัจจุบันของคุณ
const repositoryName = "engse203-student-labs-68543210001";

export default defineConfig({
  base: `/${repositoryName}/labs/week-02/`,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
