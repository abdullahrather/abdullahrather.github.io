// Where the site's content lives: the `content/` folder, or another folder named by
// CONTENT_DIR (in the environment or in .env), for keeping your own content outside this repo.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

try {
  process.loadEnvFile(path.join(root, ".env"));
} catch {
  // No .env file: the environment alone decides.
}

export const contentDir = path.resolve(root, process.env.CONTENT_DIR || "content");
export const publicDir = path.join(contentDir, "public");

export const readContent = (file) => JSON.parse(fs.readFileSync(path.join(contentDir, file), "utf8"));
