import { CategorySlug } from "@/types/product";

export interface Category {
  slug: CategorySlug;
  name: string;
}

export const CATEGORIES: Category[] = [
  { slug: "sofas", name: "Sofás" },
  { slug: "camas", name: "Camas" },
  { slug: "comedores", name: "Comedores" },
  { slug: "sofacamas", name: "Sofacamas" },
  { slug: "cortinas", name: "Cortinería" },
  { slug: "sillas", name: "Sillas" },
  { slug: "medida", name: "Diseños a medida" },
];
