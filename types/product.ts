export type CategorySlug =
  | "sofas"
  | "camas"
  | "comedores"
  | "sofacamas"
  | "cortinas"
  | "sillas"
  | "medida";

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  description: string;
  materials: string[];
  images: string[];
  featured: boolean;
  whatsappMsg: string;
  createdAt: Date;
}
