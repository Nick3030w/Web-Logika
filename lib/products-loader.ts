import { Product, CategorySlug } from "@/types/product";
import { MOCK_PRODUCTS } from "@/lib/mock/products";

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
  return firestoreProducts || MOCK_PRODUCTS;
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
