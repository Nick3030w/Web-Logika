import { Product } from "@/types/product";

/**
 * Mock products for development when Firebase is not available.
 * Replace with real Firestore data once Firebase Storage is configured.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "sofa-modular-milano",
    name: "Sofá Modular Milano",
    category: "sofas",
    description:
      "Sofá modular de 3 puestos con espuma de alta densidad y estructura en madera seleccionada. Tapizado en tela premium resistente al desgaste. Diseño contemporáneo que se adapta a cualquier espacio.",
    materials: ["Espuma HD", "Madera seleccionada", "Tela premium"],
    images: [
      "/placeholder/product-1.svg",
      "/placeholder/product-1b.svg",
    ],
    featured: true,
    whatsappMsg: "Hola, me interesa el Sofá Modular Milano",
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "cama-king-florencia",
    name: "Cama King Florencia",
    category: "camas",
    description:
      "Cama king size con cabecero tapizado en capitoné. Base en madera maciza con sistema de soporte reforzado. Incluye cabecero de 1.60m de alto para un look elegante y sofisticado.",
    materials: ["Madera maciza", "Espuma HR", "Tela capitoné"],
    images: [
      "/placeholder/product-2.svg",
      "/placeholder/product-2b.svg",
    ],
    featured: true,
    whatsappMsg: "Hola, me interesa la Cama King Florencia",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "comedor-6-puestos-nordic",
    name: "Comedor 6 Puestos Nordic",
    category: "comedores",
    description:
      "Mesa de comedor para 6 personas en madera natural con acabado mate. Líneas limpias y funcionales inspiradas en el diseño escandinavo. Incluye 6 sillas tapizadas a juego.",
    materials: ["Madera natural", "Laca mate", "Tela de alta resistencia"],
    images: [
      "/placeholder/product-3.svg",
    ],
    featured: false,
    whatsappMsg: "Hola, me interesa el Comedor 6 Puestos Nordic",
    createdAt: new Date("2025-03-05"),
  },
  {
    id: "sofacama-convertible-duo",
    name: "Sofacama Convertible Duo",
    category: "sofacamas",
    description:
      "Sofacama con mecanismo de apertura fácil tipo clic-clac. Colchón integrado de espuma de alta densidad para máximo confort. Perfecto para espacios reducidos sin sacrificar comodidad.",
    materials: ["Espuma HD", "Mecanismo metálico", "Microfibra"],
    images: [
      "/placeholder/product-4.svg",
    ],
    featured: true,
    whatsappMsg: "Hola, me interesa el Sofacama Convertible Duo",
    createdAt: new Date("2025-03-20"),
  },
  {
    id: "cortinas-blackout-elegance",
    name: "Cortinas Blackout Elegance",
    category: "cortinas",
    description:
      "Cortinas blackout con caída perfecta y bloqueo total de luz. Tela termoacústica que ayuda a regular la temperatura. Disponibles en múltiples colores y medidas a la carta.",
    materials: ["Tela blackout termoacústica", "Riel de aluminio"],
    images: [
      "/placeholder/product-5.svg",
    ],
    featured: false,
    whatsappMsg: "Hola, me interesan las Cortinas Blackout Elegance",
    createdAt: new Date("2025-04-01"),
  },
  {
    id: "silla-ergonomica-studio",
    name: "Silla Ergonómica Studio",
    category: "sillas",
    description:
      "Silla con soporte lumbar ajustable y tapizado transpirable. Estructura cromada con mecanismo de elevación a gas. Ideal para largas jornadas de trabajo o estudio.",
    materials: ["Malla transpirable", "Espuma moldeada", "Cromo"],
    images: [
      "/placeholder/product-6.svg",
    ],
    featured: false,
    whatsappMsg: "Hola, me interesa la Silla Ergonómica Studio",
    createdAt: new Date("2025-04-15"),
  },
  {
    id: "mueble-tv-a-medida",
    name: "Mueble TV a Medida",
    category: "medida",
    description:
      "Mueble para TV diseñado según tus medidas exactas. Combinación de madera y laca con espacios para equipos electrónicos. Incluye sistema de gestión de cables oculto.",
    materials: ["MDF", "Laca poliuretano", "Herrajes importados"],
    images: [
      "/placeholder/product-7.svg",
    ],
    featured: true,
    whatsappMsg: "Hola, me interesa el Mueble TV a Medida",
    createdAt: new Date("2025-05-01"),
  },
];
