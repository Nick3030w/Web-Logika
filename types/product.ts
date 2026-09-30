export type CategorySlug =
  | "sofas"
  | "camas"
  | "comedores"
  | "sofacamas"
  | "cortinas"
  | "sillas"
  | "medida";

export type SalesMode = "whatsapp" | "quote";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  description: string;
  materials: string[];
  images: string[];
  /** Optional product videos (MP4/WebM URLs, local or Firebase Storage). */
  videos?: string[];
  featured: boolean;
  whatsappMsg: string;
  createdAt: Date;
  salesMode?: SalesMode;
  price?: number;
  dimensions?: string;
  leadTime?: string;
  customizable?: boolean;
}
