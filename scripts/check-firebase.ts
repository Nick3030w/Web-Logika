/**
 * media:check — Verifica la conexión con Firebase (Firestore + Storage).
 *
 * Ejecuta:  npm run media:check
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { loadEnv, checkRequiredVars } from "./lib/env";

// 1. Cargar credenciales desde .env.local
loadEnv();
checkRequiredVars();

// 2. Inicializar Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = getFirestore(app);
const storage = getStorage(app);

// 3. Verificar conexión
async function check(): Promise<void> {
  console.log("🔍 Verificando conexión con Firebase...\n");
  let allGood = true;

  // --- Firestore ---
  console.log("1. Firestore Database");
  try {
    const snapshot = await db.collection("products").limit(1).get();
    console.log(`   ✅ Conectado — colección "products" accesible (${snapshot.size} documento(s)).`);
  } catch (error: any) {
    console.error(`   ❌ Error: ${error.message}`);
    allGood = false;
  }

  // --- Storage ---
  console.log("\n2. Firebase Storage");
  try {
    const bucket = storage.bucket();
    const [exists] = await bucket.exists();
    if (exists) {
      console.log(`   ✅ Bucket "${bucket.name}" accesible.`);
    } else {
      console.error(`   ❌ El bucket "${bucket.name}" no existe.`);
      console.error("      Revisa FIREBASE_STORAGE_BUCKET en .env.local (sin el prefijo gs://).");
      allGood = false;
    }
  } catch (error: any) {
    console.error(`   ❌ Error: ${error.message}`);
    allGood = false;
  }

  // --- WhatsApp ---
  console.log("\n3. WhatsApp");
  const whatsappPhone = process.env.WHATSAPP_PHONE;
  if (whatsappPhone) {
    console.log(`   ✅ Número configurado: ${whatsappPhone}`);
  } else {
    console.warn("   ⚠️  WHATSAPP_PHONE no está configurado (el botón de WhatsApp no funcionará).");
  }

  // --- Resumen ---
  if (allGood) {
    console.log("\n✅ Todo en orden. Ya puedes subir productos con: npm run media:seed\n");
  } else {
    console.log("\n⚠️  Hay problemas que corregir antes de continuar.\n");
  }

  process.exit(allGood ? 0 : 1);
}

check().catch((err) => {
  console.error("\n❌ Error inesperado:", err);
  process.exit(1);
});
