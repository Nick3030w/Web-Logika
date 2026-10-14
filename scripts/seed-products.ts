/**
 * media:seed — Sube imágenes a Firebase Storage y crea los productos en Firestore.
 *
 * Ejecuta:  npm run media:seed
 *
 * Lee la configuración de seed/products.json. Para cada producto:
 *   1. Sube cada imagen local a Storage en products/{id}/{filename}
 *   2. Construye la URL pública
 *   3. Crea o actualiza el documento en Firestore con todos los datos
 *
 * Volver a ejecutar el comando actualiza los productos existentes (usa set, no add).
 */
import { readFileSync, existsSync } from "fs";
import { join, basename } from "path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { loadEnv, checkRequiredVars } from "./lib/env";

// --- Tipos del seed config ---

interface SeedProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  materials: string[];
  images: string[]; // rutas locales, ej: "public/placeholder/product-1.svg" o "seed/images/sofa.jpg"
  featured: boolean;
  whatsappMsg: string;
}

// --- Cargar credenciales ---
loadEnv();
checkRequiredVars();

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
const bucket = storage.bucket();

// --- Helpers ---

/** Construye la URL pública de un archivo en Storage. */
function buildPublicUrl(storagePath: string): string {
  const encoded = encodeURIComponent(storagePath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encoded}?alt=media`;
}

/** Sube un archivo local a Storage y retorna la URL pública. */
async function uploadImage(localPath: string, productId: string, index: number): Promise<string> {
  const resolved = join(process.cwd(), localPath);

  if (!existsSync(resolved)) {
    throw new Error(`Imagen no encontrada: ${resolved}`);
  }

  const filename = basename(localPath);
  const storagePath = `products/${productId}/${index}-${filename}`;

  console.log(`   📤 Subiendo ${localPath} → ${storagePath}`);

  await bucket.upload(resolved, {
    destination: storagePath,
    metadata: { cacheControl: "public, max-age=31536000" },
  });

  // Hacer público el archivo para que sea accesible sin autenticación
  await bucket.file(storagePath).makePublic();

  return buildPublicUrl(storagePath);
}

// --- Script principal ---

async function main(): Promise<void> {
  console.log("📦 Cargando configuración de productos...\n");

  const configPath = join(process.cwd(), "seed", "products.json");

  if (!existsSync(configPath)) {
    console.error("❌ No se encontró seed/products.json");
    console.error("   Crea el archivo con la configuración de tus productos.");
    process.exit(1);
  }

  const products: SeedProduct[] = JSON.parse(readFileSync(configPath, "utf-8"));

  console.log(`   ${products.length} producto(s) para subir.\n`);

  let success = 0;
  let failed = 0;

  for (const product of products) {
    console.log(`\n🔹 ${product.name} (${product.id})`);

    try {
      // Subir imágenes
      const imageUrls: string[] = [];
      for (let i = 0; i < product.images.length; i++) {
        const url = await uploadImage(product.images[i], product.id, i + 1);
        imageUrls.push(url);
      }

      // Crear/actualizar documento en Firestore
      await db
        .collection("products")
        .doc(product.id)
        .set({
          name: product.name,
          category: product.category,
          description: product.description,
          materials: product.materials,
          images: imageUrls,
          featured: product.featured,
          whatsappMsg: product.whatsappMsg,
          createdAt: FieldValue.serverTimestamp(),
        });

      console.log(`   ✅ Guardado en Firestore con ${imageUrls.length} imagen(es).`);
      success++;
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`);
      failed++;
    }
  }

  // Resumen
  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ ${success} producto(s) subidos correctamente.`);
  if (failed > 0) {
    console.error(`❌ ${failed} producto(s) con error.`);
  }
  console.log(
    `\n💡 Los cambios aparecen en la web en hasta 1 hora (caché ISR).` +
      `\n   Para verlos inmediatamente, reinicia el servidor de desarrollo.`
  );

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("\n❌ Error inesperado:", err);
  process.exit(1);
});
