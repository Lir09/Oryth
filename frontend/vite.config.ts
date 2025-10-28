// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 저장소 이름이 Oryth 라면 base는 '/Oryth/' 로!
export default defineConfig({
  plugins: [react()],
  base: "/Oryth/",
});
