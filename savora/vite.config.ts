import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function waitlistApi() {
  const waitlistFile = path.resolve(__dirname, "data/waitlist.json");

  return {
    name: "waitlist-api",
    configureServer(server: { middlewares: { use: Function } }) {
      server.middlewares.use("/api/waitlist", (req: { method?: string; on: Function }, res: { statusCode: number; setHeader: Function; end: Function }, next: Function) => {
        if (req.method !== "POST") return next();

        let body = "";
        req.on("data", (chunk: Buffer) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const { email } = JSON.parse(body);
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid email" }));
              return;
            }

            const dir = path.dirname(waitlistFile);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            const list = fs.existsSync(waitlistFile)
              ? JSON.parse(fs.readFileSync(waitlistFile, "utf-8"))
              : [];

            if (!list.some((entry: { email: string }) => entry.email === email)) {
              list.push({ email, timestamp: new Date().toISOString() });
              fs.writeFileSync(waitlistFile, JSON.stringify(list, null, 2));
            }

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Server error" }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), waitlistApi()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/app"),
    },
  },
});
