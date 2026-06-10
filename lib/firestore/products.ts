import { adminDb } from "@/lib/firebase/admin";
import { Product, CategorySlug } from "@/types/product";

/**
 * Fetches all products from Firestore, ordered by createdAt descending.
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const snapshot = await adminDb
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() ?? new Date(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

/**
 * Fetches a single product by its slug (document ID).
 * Returns null if not found.
 */
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const doc = await adminDb.collection("products").doc(slug).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() ?? new Date(),
    } as Product;
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches products filtered by category, ordered by createdAt descending.
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

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() ?? new Date(),
    })) as Product[];
  } catch (error) {
    console.error(
      `Error fetching products for category "${category}":`,
      error
    );
    return [];
  }
}

/**
 * Fetches all featured products.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const snapshot = await adminDb
      .collection("products")
      .where("featured", "==", true)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() ?? new Date(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
