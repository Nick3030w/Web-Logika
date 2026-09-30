import { Product, CategorySlug } from "@/types/product";
import { MOCK_PRODUCTS } from "@/lib/mock/products";

/**
 * Set USE_MOCK_PRODUCTS=false once the Firestore catalog is live to make sure
 * demo products never reach visitors, even if Firestore is unreachable.
 */
const mockFallbackEnabled = process.env.USE_MOCK_PRODUCTS !== "false";

/**
 * Tries to load products from Firestore. Falls back to mock data
 * if Firebase is not configured or an error occurs.
 */
async function loadFromFirestore(): Promise<Product[] | null> {
  try {
    const { getAllProducts } = await import("@/lib/firestore/products");
    const products = await getAllProducts();
    if (products.length > 0) return products;
    return null;
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  const firestoreProducts = await loadFromFirestore();
  if (firestoreProducts) return firestoreProducts;

  if (!mockFallbackEnabled) return [];

  console.warn(
    "[products] Firestore sin datos o no configurado: mostrando catálogo de ejemplo. " +
      "Ejecuta `npm run media:upload` y define USE_MOCK_PRODUCTS=false cuando el catálogo real esté publicado."
  );
  return MOCK_PRODUCTS;
}

export async function getProductsByCategory(
  category: CategorySlug
): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === category);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.id === slug) || null;
}

export async function getFeatured(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.featured);
}
