#!/usr/bin/env node
/**
 * Publishes product media to Firebase Storage and syncs the product documents
 * in Firestore.
 *
 * Expected local structure (one folder per product, folder name = URL slug):
 *
 *   media/
 *     sofa-oslo-gris/
 *       producto.json
 *       01-principal.jpg
 *       02-detalle.jpg
 *       video-01.mp4
 *
 * Usage:
 *   npm run media:check                 Validate credentials and files only
 *   npm run media:dry-run               Show what would be uploaded
 *   npm run media:upload                Upload and publish
 *   npm run media:upload -- --force     Re-upload files that already exist
 *   npm run media:upload -- --only=sofa-oslo-gris
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Windows consoles default to a legacy code page, which breaks accented text.
if (process.platform === "win32") {
  try {
    execSync("chcp 65001", { stdio: "ignore" });
  } catch {
    // Not critical: output stays readable, only accents may look wrong.
  }
}

const { initializeApp, getApps, cert } = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const STORAGE_PREFIX = "productos";

const VALID_CATEGORIES = [
  "sofas",
  "camas",
  "comedores",
  "sofacamas",
  "cortinas",
  "sillas",
  "medida",
];

const IMAGE_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

const VIDEO_TYPES = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

const IMAGE_WARN_BYTES = 1_500_000;
const VIDEO_WARN_BYTES = 25_000_000;

const colors = {
  reset: "\u001b[0m",
  dim: "\u001b[2m",
  red: "\u001b[31m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  cyan: "\u001b[36m",
};

function log(message = "") {
  console.log(message);
}

function info(message) {
  log(`${colors.cyan}•${colors.reset} ${message}`);
}

function ok(message) {
  log(`${colors.green}✓${colors.reset} ${message}`);
}

function warn(message) {
  log(`${colors.yellow}!${colors.reset} ${message}`);
}

function fail(message) {
  log(`${colors.red}✗${colors.reset} ${message}`);
}

function formatSize(bytes) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1000))} KB`;
}

function parseArgs(argv) {
  const options = {
    check: false,
    dryRun: false,
    force: false,
    only: null,
    mediaDir: path.join(PROJECT_ROOT, "media"),
  };

  argv.forEach((arg) => {
    if (arg === "--check") options.check = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--force") options.force = true;
    else if (arg.startsWith("--only=")) options.only = arg.slice("--only=".length);
    else if (arg.startsWith("--media=")) {
      options.mediaDir = path.resolve(PROJECT_ROOT, arg.slice("--media=".length));
    } else if (arg.startsWith("--")) {
      warn(`Opción desconocida ignorada: ${arg}`);
    }
  });

  return options;
}

/** Minimal .env.local reader so the script works without extra dependencies. */
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  content.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) return;

    const separator = line.indexOf("=");
    if (separator === -1) return;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (isQuoted) value = value.slice(1, -1);

    if (!(key in process.env)) process.env[key] = value;
  });
}

function requireEnv() {
  const required = [
    "FIREBASE_PROJECT_ID",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PRIVATE_KEY",
    "FIREBASE_STORAGE_BUCKET",
  ];

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    fail(`Faltan variables en .env.local: ${missing.join(", ")}`);
    log();
    log("Copia .env.local.example a .env.local y completa las credenciales de");
    log("la cuenta de servicio de Firebase antes de continuar.");
    process.exit(1);
  }
}

function initFirebase() {
  if (getApps().length > 0) return getApps()[0];

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

function naturalSort(a, b) {
  return a.localeCompare(b, "es", { numeric: true, sensitivity: "base" });
}

function readProductFolders(mediaDir, only) {
  if (!fs.existsSync(mediaDir)) {
    fail(`No existe la carpeta de medios: ${mediaDir}`);
    log();
    log("Crea la estructura esperada, por ejemplo:");
    log("  media/sofa-oslo-gris/producto.json");
    log("  media/sofa-oslo-gris/01-principal.jpg");
    process.exit(1);
  }

  return fs
    .readdirSync(mediaDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith("_") && !name.startsWith("."))
    .filter((name) => (only ? name === only : true))
    .sort(naturalSort);
}

function readProductConfig(folderPath, slug) {
  const configPath = path.join(folderPath, "producto.json");
  if (!fs.existsSync(configPath)) {
    return { error: `falta producto.json en ${slug}/` };
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    return { error: `producto.json de ${slug} no es JSON válido (${error.message})` };
  }

  if (!config.name || typeof config.name !== "string") {
    return { error: `producto.json de ${slug} necesita "name"` };
  }

  if (!VALID_CATEGORIES.includes(config.category)) {
    return {
      error: `producto.json de ${slug} necesita "category" válida (${VALID_CATEGORIES.join(", ")})`,
    };
  }

  return { config };
}

function collectMedia(folderPath) {
  const files = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.toLowerCase() !== "producto.json")
    .sort(naturalSort);

  const images = [];
  const videos = [];

  files.forEach((name) => {
    const extension = path.extname(name).toLowerCase();
    const fullPath = path.join(folderPath, name);
    const size = fs.statSync(fullPath).size;

    if (IMAGE_TYPES[extension]) {
      images.push({ name, fullPath, size, contentType: IMAGE_TYPES[extension] });
    } else if (VIDEO_TYPES[extension]) {
      videos.push({ name, fullPath, size, contentType: VIDEO_TYPES[extension] });
    }
  });

  return { images, videos };
}

async function uploadFile(bucket, slug, file, options) {
  const destination = `${STORAGE_PREFIX}/${slug}/${file.name}`;
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

  if (options.dryRun || options.check) {
    return { publicUrl, skipped: true, planned: true };
  }

  const remoteFile = bucket.file(destination);
  const [exists] = await remoteFile.exists();

  if (exists && !options.force) {
    const [metadata] = await remoteFile.getMetadata();
    if (Number(metadata.size) === file.size) {
      return { publicUrl, skipped: true };
    }
  }

  await bucket.upload(file.fullPath, {
    destination,
    resumable: file.size > 5_000_000,
    metadata: {
      contentType: file.contentType,
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  try {
    await remoteFile.makePublic();
  } catch (error) {
    warn(
      `No se pudo marcar como público ${destination} (${error.message}). ` +
        "Revisa que el bucket permita lectura pública: acceso uniforme y allUsers con rol Storage Object Viewer."
    );
  }

  return { publicUrl, skipped: false };
}

function buildDocumentPayload(config, images, videos) {
  const isCustomCategory = config.category === "medida";
  const salesMode =
    config.salesMode === "quote" || isCustomCategory ? "quote" : "whatsapp";

  const payload = {
    name: config.name,
    category: config.category,
    description: typeof config.description === "string" ? config.description : "",
    materials: Array.isArray(config.materials) ? config.materials : [],
    images,
    videos,
    featured: config.featured === true,
    salesMode,
    customizable: config.customizable !== false,
    whatsappMsg:
      typeof config.whatsappMsg === "string" && config.whatsappMsg
        ? config.whatsappMsg
        : salesMode === "quote"
          ? `Hola Logika, quiero una cotización personalizada basada en ${config.name}.`
          : `Hola Logika, me interesa ${config.name}.`,
  };

  const optionalFields = ["price", "dimensions", "leadTime"];
  optionalFields.forEach((field) => {
    if (!(field in config)) return;
    const value = config[field];
    payload[field] =
      value === null || value === "" ? FieldValue.delete() : value;
  });

  return payload;
}

async function run() {
  const options = parseArgs(process.argv.slice(2));

  log();
  log(`${colors.dim}Logika · publicación de medios${colors.reset}`);
  log();

  loadEnvFile(path.join(PROJECT_ROOT, ".env.local"));
  requireEnv();

  // 1. Local validation first, so file problems surface before any network call.
  const folders = readProductFolders(options.mediaDir, options.only);

  if (folders.length === 0) {
    warn(
      options.only
        ? `No se encontró la carpeta "${options.only}" en ${options.mediaDir}`
        : `No hay carpetas de producto en ${options.mediaDir}`
    );
    log(`${colors.dim}Carpeta revisada: ${options.mediaDir}${colors.reset}`);
    process.exit(0);
  }

  info(
    `${folders.length} carpeta(s) de producto encontrada(s)` +
      (options.check ? " · modo verificación" : "") +
      (options.dryRun ? " · simulación" : "")
  );
  log();

  const errors = [];
  const plan = [];

  for (const slug of folders) {
    const folderPath = path.join(options.mediaDir, slug);
    const { config, error } = readProductConfig(folderPath, slug);

    if (error) {
      errors.push(error);
      fail(error);
      continue;
    }

    const { images, videos } = collectMedia(folderPath);

    if (images.length === 0) {
      const message = `${slug}: no hay imágenes válidas (jpg, png, webp, avif)`;
      errors.push(message);
      fail(message);
      continue;
    }

    images.forEach((file) => {
      if (file.size > IMAGE_WARN_BYTES) {
        warn(
          `${slug}/${file.name} pesa ${formatSize(file.size)}. Recomendado: menos de 1.5 MB.`
        );
      }
    });

    videos.forEach((file) => {
      if (file.size > VIDEO_WARN_BYTES) {
        warn(
          `${slug}/${file.name} pesa ${formatSize(file.size)}. Recomendado: menos de 25 MB.`
        );
      }
    });

    ok(
      `${slug} · ${config.name} · ${images.length} imagen(es), ${videos.length} video(s)`
    );
    plan.push({ slug, config, images, videos });
  }

  log();

  if (plan.length === 0) {
    fail("Ninguna carpeta quedó lista para publicar. Corrige los errores y repite.");
    process.exit(1);
  }

  // 2. Connectivity check against the real bucket.
  let app;
  try {
    app = initFirebase();
  } catch (error) {
    fail(`Credenciales de Firebase inválidas: ${error.message}`);
    log('Revisa FIREBASE_PRIVATE_KEY: debe ir entre comillas y conservar los "\\n".');
    process.exit(1);
  }

  const db = getFirestore(app);
  const bucket = getStorage(app).bucket();

  try {
    const [bucketExists] = await bucket.exists();
    if (!bucketExists) {
      fail(`El bucket "${bucket.name}" no existe o la cuenta no tiene acceso.`);
      log("Verifica FIREBASE_STORAGE_BUCKET y que Storage esté activado.");
      process.exit(1);
    }
    ok(`Conexión correcta con el bucket ${bucket.name}`);
    log();
  } catch (error) {
    fail(`No se pudo acceder a Storage: ${error.message}`);
    log("Revisa las credenciales de la cuenta de servicio y el nombre del bucket.");
    process.exit(1);
  }

  // 3. Upload media and publish documents.
  let uploaded = 0;
  let skipped = 0;
  let published = 0;

  for (const { slug, config, images, videos } of plan) {
    log(`${colors.dim}${slug}${colors.reset} · ${config.name}`);

    const imageUrls = [];
    const videoUrls = [];

    try {
      for (const file of images) {
        const result = await uploadFile(bucket, slug, file, options);
        imageUrls.push(result.publicUrl);
        if (result.planned) {
          log(`  ${colors.dim}→ subiría${colors.reset} ${file.name} (${formatSize(file.size)})`);
        } else if (result.skipped) {
          skipped += 1;
          log(`  ${colors.dim}= sin cambios${colors.reset} ${file.name}`);
        } else {
          uploaded += 1;
          ok(`  imagen ${file.name} (${formatSize(file.size)})`);
        }
      }

      for (const file of videos) {
        const result = await uploadFile(bucket, slug, file, options);
        videoUrls.push(result.publicUrl);
        if (result.planned) {
          log(`  ${colors.dim}→ subiría${colors.reset} ${file.name} (${formatSize(file.size)})`);
        } else if (result.skipped) {
          skipped += 1;
          log(`  ${colors.dim}= sin cambios${colors.reset} ${file.name}`);
        } else {
          uploaded += 1;
          ok(`  video ${file.name} (${formatSize(file.size)})`);
        }
      }
    } catch (error) {
      const message = `${slug}: error subiendo archivos (${error.message})`;
      errors.push(message);
      fail(message);
      continue;
    }

    if (options.check || options.dryRun) {
      log(`  ${colors.dim}→ actualizaría products/${slug}${colors.reset}`);
      log();
      continue;
    }

    try {
      const docRef = db.collection("products").doc(slug);
      const snapshot = await docRef.get();
      const existingCreatedAt = snapshot.exists && snapshot.get("createdAt");

      await docRef.set(
        {
          ...buildDocumentPayload(config, imageUrls, videoUrls),
          createdAt: existingCreatedAt || Timestamp.now(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      published += 1;
      ok(`  ficha publicada en products/${slug}`);
    } catch (error) {
      const message = `${slug}: error guardando en Firestore (${error.message})`;
      errors.push(message);
      fail(message);
    }

    log();
  }

  log(`${colors.dim}Resumen${colors.reset}`);
  log(`  Archivos subidos:   ${uploaded}`);
  log(`  Sin cambios:        ${skipped}`);
  log(`  Fichas publicadas:  ${published}`);
  log(`  Errores:            ${errors.length}`);
  log();

  if (!options.check && !options.dryRun && published > 0) {
    info("El catálogo se revalida cada hora (ISR). Para verlo al instante,");
    log("  reinicia `npm run dev` o vuelve a desplegar en Vercel.");
    log();
  }

  if (errors.length > 0) process.exit(1);
}

run().catch((error) => {
  fail(`Error inesperado: ${error.message}`);
  process.exit(1);
});
