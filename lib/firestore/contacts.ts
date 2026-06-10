import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { ContactFormData } from "@/types/contact";

/**
 * Saves a contact form submission to Firestore.
 * Adds a server-side `createdAt` timestamp automatically.
 */
export async function saveContact(data: ContactFormData): Promise<void> {
  try {
    await adminDb.collection("contacts").add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    throw error;
  }
}
