export interface NavLink {
  href: string;
  /** Short label used in the compact header navigation. */
  label: string;
  /** Optional longer label for places with more room, such as the footer. */
  longLabel?: string;
}

/**
 * Single source of truth for the main site navigation. Header uses `label`;
 * Footer falls back to `longLabel` when it needs a more descriptive wording.
 */
export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/a-medida", label: "A medida", longLabel: "Muebles a medida" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];
