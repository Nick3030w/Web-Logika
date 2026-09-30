import type { DocumentSnapshot } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { CategorySlug, Product, SalesMode } from "@/types/product";
import { CATEGORIES } from "@/constants/categories";

const CATEGORY_SLUGS: string[] = CATEGORIES.map((category) => category.slug);

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0
  );
}

function toDate(value: unknown): Date {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate: unknown }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date();
}

/**
 * Converts a Firestore document into a Product, applying safe defaults so a
 * partially filled document never breaks the catalog.
 */
function mapProduct(doc: DocumentSnapshot): Product {
  const data = doc.data() ?? {};

  const category: CategorySlug = CATEGORY_SLUGS.includes(data.category)
    ? (data.category as CategorySlug)
    : "medida";

  const salesMode: SalesMode =
    data.salesMode === "quote" || category === "medida" ? "quote" : "whatsapp";

  const name = typeof data.name === "string" && data.name ? data.name : doc.id;
  const price =
    typeof data.price === "number" && Number.isFinite(data.price) && data.price > 0
      ? data.price
      : undefined;

  return {
    id: doc.id,
    name,
    category,
    description: typeof data.description === "string" ? data.description : "",
    materials: toStringArray(data.materials),
    images: toStringArray(data.images),
    videos: toStringArray(data.videos),
    featured: data.featured === true,
    whatsappMsg:
      typeof data.whatsappMsg === "string" && data.whatsappMsg
        ? data.whatsappMsg
        : `Hola Logika, me interesa ${name}.`,
    createdAt: toDate(data.createdAt),
    salesMode,
    price,
    dimensions:
      typeof data.dimensions === "string" && data.dimensions
        ? data.dimensions
        : undefined,
    leadTime:
      typeof data.leadTime === "string" && data.leadTime ? data.leadTime : undefined,
    customizable: data.customizable === true,
  };
}

/**
 * Fetches all published products from Firestore, newest first.
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const snapshot = await adminDb
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map(mapProduct);
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

/**
 * Fetches a single product by its slug (document ID). Returns null if missing.
 */
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const doc = await adminDb.collection("products").doc(slug).get();
    if (!doc.exists) return null;
    return mapProduct(doc);
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches products filtered by category, newest first.
 */
export async function getProductsByCategory(
  category: CategorySlug
): Promise<Product[]> {
  try {
    const snapshot = await adminDb
      .collection("products")
      .where("category", "==", category)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map(mapProduct);
  } catch (error) {
    console.error(`Error fetching products for category "${category}":`, error);
    return [];
  }
}

/**
 * Fetches products flagged as featured.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const snapshot = await adminDb
      .collection("products")
      .where("featured", "==", true)
      .get();

    return snapshot.docs.map(mapProduct);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
