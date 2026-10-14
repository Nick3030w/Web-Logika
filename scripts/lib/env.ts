import { readFileSync, existsSync } from "fs";
import { join } from "path";

/**
 * Loads variables from .env.local into process.env.
 * Real environment variables (already set) take precedence.
 */
export function loadEnv(): void {
  const envPath = join(process.cwd(), ".env.local");

  if (!existsSync(envPath)) {
    console.error("❌ No se encontró .env.local");
    console.error("   Copia .env.local.example como .env.local y completa los valores.");
    process.exit(1);
  }

  const content = readFileSync(envPath, "utf-8");

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    // Strip surrounding quotes
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }

    // Don't override existing env vars
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

/** Required Firebase env vars for media scripts to work. */
export const REQUIRED_FIREBASE_VARS = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
  "FIREBASE_STORAGE_BUCKET",
];

/** Checks that all required env vars are present. Exits if any are missing. */
export function checkRequiredVars(): void {
  const missing = REQUIRED_FIREBASE_VARS.filter((k) => !process.env[k]);

  if (missing.length > 0) {
    console.error("\n❌ Faltan variables en .env.local:\n");
    missing.forEach((k) => console.error(`   - ${k}`));
    console.error("\n   Copia .env.local.example como .env.local y completa los valores.");
    process.exit(1);
  }
}
