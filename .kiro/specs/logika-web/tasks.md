# Implementation Plan: logika-web

## Overview

This plan implements the Logika Decoración website — a visual digital catalog and lead-generation site built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Firebase. The architecture is serverless (Vercel + Firebase), uses ISR for catalog pages, and converts visitors via WhatsApp CTA. Implementation follows a bottom-up approach: project setup → shared components → feature pages → SEO → optimization.

## Tasks

- [x] 1. Project setup and configuration
  - [x] 1.1 Initialize Next.js 14 project with TypeScript and Tailwind CSS
    - Run `npx create-next-app@14` with App Router, TypeScript, Tailwind CSS, ESLint enabled
    - Configure `tailwind.config.ts` with custom colors (`primary: #212121`, `accent: #00BCD4`, `bg-base: #FFFFFF`, `bg-subtle: #FAFAFA`, `text-muted: #6B7280`, `border: #E5E7EB`), fonts (`heading: Playfair Display`, `body: Inter`), and spacing tokens
    - Set up `next/font/google` for Playfair Display and Inter with `latin` + `latin-ext` subsets
    - Configure `next.config.js` with Firebase Storage domain in `images.remotePatterns`
    - _Requirements: 10.1, 11.1_

  - [x] 1.2 Set up Firebase Admin SDK and environment variables
    - Create `lib/firebase/admin.ts` with singleton initialization pattern using `getApps().length` check
    - Define environment variables: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_STORAGE_BUCKET`, `WHATSAPP_PHONE`
    - Create `.env.local.example` documenting required variables (no actual secrets)
    - Ensure no `NEXT_PUBLIC_` prefix — all credentials are server-side only  m
    - _Requirements: 12.1, 14.2_

  - [x] 1.3 Create TypeScript types and constants
    - Create `types/product.ts` with `Product` interface and `CategorySlug` type (7 categories)
    - Create `types/contact.ts` with `ContactFormData` and `ContactSubmission` interfaces
    - Create `constants/categories.ts` with `CATEGORIES` array (slug + display name mapping for all 7 categories)
    - Create `constants/whatsapp.ts` with `DEFAULT_WHATSAPP_MSG` constant
    - _Requirements: 2.4, 5.3_

  - [x] 1.4 Implement Firestore data access layer
    - Create `lib/firestore/products.ts` with functions: `getAllProducts()`, `getProduct(slug)`, `getProductsByCategory(category)`, `getFeaturedProducts()`
    - Create `lib/firestore/contacts.ts` with function: `saveContact(data)` that adds server-side `createdAt` timestamp
    - All functions use Firebase Admin SDK, include error handling with try/catch
    - _Requirements: 12.1, 12.2, 12.3_

  - [x] 1.5 Install testing dependencies and configure Jest
    - Install `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`, `jest-axe`, `jest-environment-jsdom`
    - Create `jest.config.ts` with Next.js preset and path aliases
    - Create `jest.setup.ts` importing `@testing-library/jest-dom`
    - _Requirements: (testing infrastructure)_

- [x] 2. Layout components (Header, Footer, WhatsApp floating button)
  - [ ] 2.1 Implement Header component
    - Create `components/layout/Header.tsx` as a Client Component (`'use client'`)
    - Dark background (`#212121`), centered logo, nav links (Inicio, Catálogo, Nosotros, Contacto)
    - Add Instagram and WhatsApp social icons
    - Implement hamburger menu toggle for viewports < 768px with mobile overlay
    - Ensure keyboard navigability and semantic HTML (`<nav>`, `<header>`)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 13.3, 13.4_

  - [ ] 2.2 Implement Footer component
    - Create `components/layout/Footer.tsx` as a Server Component
    - Display logo, brief company description, matching nav links, social icons (Instagram, WhatsApp)
    - Include contact information and copyright notice
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ] 2.3 Implement WhatsAppButton floating component
    - Create `components/layout/WhatsAppButton.tsx` as a Client Component
    - Fixed position `bottom-6 right-6`, `z-50`
    - Opens `https://wa.me/{phone}?text={encodedMessage}` in new tab with default message
    - Include `aria-label="Contactar por WhatsApp"` for accessibility
    - Ensure no overlap with content on mobile (< 768px)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 13.3_

  - [ ] 2.4 Create shared UI utilities
    - Create `components/ui/LazyImage.tsx` — wrapper around `next/image` enforcing `loading="lazy"`
    - Create `components/ui/WhatsAppLink.tsx` — `buildWhatsAppUrl(phone, message)` pure function
    - _Requirements: 11.3, 6.2_

  - [ ] 2.5 Set up root layout with Header, Footer, and WhatsAppButton
    - Create `app/layout.tsx` with global font loading, Header, Footer, WhatsAppButton
    - Inject Schema.org LocalBusiness JSON-LD structured data (name, address, geo coordinates, phone, type)
    - Set base metadata (default title, description)
    - _Requirements: 9.4, 6.1_

  - [ ]* 2.6 Write unit tests for layout components
    - Test Header: hamburger toggle, nav links render, social icons present, keyboard navigation
    - Test WhatsAppButton: `aria-label` present, `href` matches expected URL format, fixed position
    - Test Footer: logo, nav links, social icons, copyright rendered
    - Run jest-axe on Header, Footer, WhatsAppButton for WCAG AA compliance
    - _Requirements: 7.1–7.5, 8.1–8.5, 6.1–6.5, 13.1_

- [ ] 3. WhatsApp integration
  - [ ] 3.1 Implement buildWhatsAppUrl utility with full test coverage
    - Implement `buildWhatsAppUrl(phone: string, message: string): string` in `components/ui/WhatsAppLink.tsx`
    - Ensure proper URL encoding of message parameter via `encodeURIComponent`
    - Use `WHATSAPP_PHONE` from environment/constants
    - _Requirements: 6.2, 3.6_

  - [ ]* 3.2 Write property test for WhatsApp URL encoding (Property 5)
    - **Property 5: WhatsApp URL encodes product message correctly**
    - For any product `whatsappMsg` string, the generated URL must contain `encodeURIComponent(whatsappMsg)`
    - **Validates: Requirements 3.6**

- [ ] 4. Checkpoint - Ensure layout and WhatsApp integration work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Filterable product catalog
  - [ ] 5.1 Implement CategoryFilter component
    - Create `components/catalog/CategoryFilter.tsx` as a Client Component
    - Horizontal scrollable pill row on mobile, vertical sidebar on desktop
    - "Todos" option to clear filter
    - Update URL via `router.push` with `?categoria=<slug>` for shareable URLs
    - _Requirements: 2.1, 2.2, 2.4_

  - [ ] 5.2 Implement ProductCard component
    - Create `components/catalog/ProductCard.tsx` as a Server Component
    - Display product image (lazy loaded via `next/image`, WebP format), product name, description truncated to 120 chars (`line-clamp-3`)
    - Entire card wrapped in `<a href="/catalogo/[slug]">` with descriptive alt text on image
    - _Requirements: 2.3, 2.5, 11.3, 13.2_

  - [ ] 5.3 Implement ProductGrid component
    - Create `components/catalog/ProductGrid.tsx` as a Server Component
    - CSS grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
    - Show empty state message when no products match filter
    - _Requirements: 2.1, 2.6_

  - [ ] 5.4 Create catalog page (`app/catalogo/page.tsx`)
    - ISR with `revalidate: 3600`
    - Read `?categoria` search param, fetch products accordingly
    - Compose CategoryFilter + ProductGrid
    - Generate page metadata (title ≤ 60 chars, description ≤ 160 chars, OG tags, canonical)
    - _Requirements: 2.1, 2.2, 9.1, 9.3, 9.5_

  - [ ]* 5.5 Write property test for category filter logic (Property 1)
    - **Property 1: Category filter returns only matching products**
    - For any category slug and product array, filtered results contain only products with matching category
    - **Validates: Requirements 2.2**

  - [ ]* 5.6 Write property tests for ProductCard (Properties 2 and 3)
    - **Property 2: ProductCard renders required fields and truncates description**
    - **Property 3: Product URL slug construction**
    - For any product, card contains name, image, description ≤ 120 chars, and href equals `/catalogo/${product.id}`
    - **Validates: Requirements 2.3, 2.5, 3.1**

- [ ] 6. Individual product page
  - [ ] 6.1 Implement ProductGallery component
    - Create `components/product/ProductGallery.tsx` as a Client Component
    - Thumbnail strip on left (vertical), large main image center
    - `useState` for selected image index
    - When `images.length < 2`: single image, no thumbnails/navigation
    - Keyboard navigation (left/right arrows)
    - _Requirements: 3.3, 3.4, 13.3_

  - [ ] 6.2 Create product detail page (`app/catalogo/[slug]/page.tsx`)
    - ISR with `revalidate: 3600` + `generateStaticParams` for known slugs
    - Fetch product via `getProduct(slug)`, call `notFound()` if null
    - Display: ProductGallery, product name, full description, materials list
    - WhatsApp CTA button using product's `whatsappMsg` field via `buildWhatsAppUrl`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ] 6.3 Implement product page SEO metadata
    - Export `generateMetadata` function with product name in title (≤ 60 chars), description (≤ 160 chars)
    - Include Open Graph tags (og:title, og:description, og:image, og:url, og:type)
    - Include canonical URL
    - _Requirements: 3.7, 9.1, 9.3, 9.5_

  - [ ] 6.4 Create custom 404 page (`app/not-found.tsx`)
    - Spanish-language "Página no encontrada" message
    - Link back to `/catalogo`
    - _Requirements: 3.2_

  - [ ]* 6.5 Write property tests for product page (Properties 4, 5, 6)
    - **Property 4: ProductPage renders all product data fields**
    - **Property 5: WhatsApp URL encodes product message correctly** (integration with product page)
    - **Property 6: Product page metadata contains product name and description**
    - **Validates: Requirements 3.5, 3.6, 3.7**

- [ ] 7. Checkpoint - Ensure catalog and product pages work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Home page
  - [ ] 8.1 Implement HeroSlider component
    - Create `components/home/HeroSlider.tsx` as a Client Component
    - Full viewport height (`h-screen`), navigation arrows, indicator dots
    - Auto-advance every 5 seconds, pause on hover
    - First slide uses `priority` on `next/image` (LCP optimization)
    - _Requirements: 1.1, 11.1_

  - [ ] 8.2 Implement CategorySection component
    - Create `components/home/CategorySection.tsx` as a Server Component
    - Left column: text links to `/catalogo?categoria=<slug>` for all 7 categories
    - Right column: asymmetric mosaic grid of lifestyle photos (CSS grid)
    - _Requirements: 1.2, 1.5_

  - [ ] 8.3 Implement DifferentiatorsSection component
    - Create `components/home/DifferentiatorsSection.tsx` as a Server Component
    - At least 3 differentiator items, each with icon, heading, body text
    - _Requirements: 1.3_

  - [ ] 8.4 Create home page (`app/page.tsx`)
    - ISR with `revalidate: 3600`
    - Compose HeroSlider, CategorySection, DifferentiatorsSection
    - Fetch featured products for slider from Firestore
    - Generate metadata (title ≤ 60 chars, description ≤ 160 chars, OG tags, canonical)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 9.1, 9.3, 9.5_

  - [ ]* 8.5 Write unit tests for home page components
    - Test HeroSlider: renders slides, dots indicator matches slide count, auto-advance
    - Test CategorySection: renders all 7 category links with correct hrefs
    - Test DifferentiatorsSection: renders ≥ 3 items with headings
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 9. About page
  - [ ] 9.1 Create about page (`app/nosotros/page.tsx`)
    - Static rendering (no `revalidate`)
    - Company history section with founding context and brand evolution
    - Manufacturing process description with materials: high-density foams, selected woods, premium fabrics, precision stitching
    - At least 2 manufacturing photos
    - Differentiators section highlighting quality vs mass-market alternatives
    - Geographic service area (Bogotá, Colombia)
    - Generate metadata (title ≤ 60 chars, description ≤ 160 chars, OG tags, canonical)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 9.1, 9.3, 9.5_

- [ ] 10. Contact page with form
  - [ ] 10.1 Implement ContactForm component
    - Create `components/contact/ContactForm.tsx` as a Client Component
    - Fields: name (max 100 chars), phone (10 digits starting with 3), productInterest (dropdown with 7 categories + "Otro"), message (max 500 chars)
    - Client-side validation on submit, field-level error display
    - Preserve entered values on validation error
    - Show success confirmation on successful submission
    - Show retry-able error message on Server Action failure
    - _Requirements: 5.3, 5.4, 5.5, 5.6_

  - [ ] 10.2 Implement contact form Server Action
    - Create Server Action in `app/contacto/actions.ts`
    - Validate input server-side (same rules: name max 100, phone 10 digits starting with 3, message max 500)
    - Call `saveContact(data)` from Firestore layer
    - Return typed `ActionResult` (`{ status: "success" } | { status: "error"; message: string }`)
    - _Requirements: 5.4, 5.6, 14.2_

  - [ ] 10.3 Create contact page (`app/contacto/page.tsx`)
    - Static rendering
    - Compose ContactForm, WhatsApp Business direct button, social media links (Instagram)
    - Generate metadata (title ≤ 60 chars, description ≤ 160 chars, OG tags, canonical)
    - _Requirements: 5.1, 5.2, 5.7, 9.1, 9.3, 9.5_

  - [ ]* 10.4 Write property tests for contact form validation (Properties 7 and 8)
    - **Property 7: Contact form phone validation — Colombian format**
    - For any string, `validatePhone(input)` returns true iff exactly 10 digits starting with 3
    - **Property 8: Contact form preserves valid field values on partial submission**
    - **Validates: Requirements 5.3, 5.5**

  - [ ]* 10.5 Write unit tests for ContactForm component
    - Test success state after mock Server Action
    - Test validation error display for invalid phone
    - Test field preservation on error
    - Run jest-axe for WCAG AA compliance
    - _Requirements: 5.3, 5.4, 5.5, 13.1_

- [ ] 11. Checkpoint - Ensure all pages render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. SEO implementation
  - [ ] 12.1 Create dynamic sitemap (`app/sitemap.ts`)
    - ISR with `revalidate: 86400` (daily)
    - Include static routes (`/`, `/catalogo`, `/nosotros`, `/contacto`)
    - Include all product URLs from Firestore (`/catalogo/[slug]`)
    - Set appropriate `changeFrequency` and `priority` values
    - _Requirements: 9.2_

  - [ ] 12.2 Create robots.txt (`app/robots.ts`)
    - Allow all crawlers, reference sitemap URL
    - _Requirements: 9.2_

  - [ ]* 12.3 Write property tests for SEO (Properties 9, 10, 11, 12)
    - **Property 9: SEO metadata length constraints** — title ≤ 60 chars, description ≤ 160 chars
    - **Property 10: Sitemap includes all product URLs**
    - **Property 11: Open Graph tags completeness** — all 5 required OG fields present (og:title, og:description, og:image, og:url, og:type)
    - **Property 12: Canonical URL matches page path**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.5**

- [ ] 13. Performance optimization and final integration
  - [ ] 13.1 Optimize images and loading strategy
    - Verify `next/image` configured for WebP with appropriate `sizes` attributes
    - Confirm `priority` on LCP element (hero image)
    - Confirm `loading="lazy"` on all below-fold images via `LazyImage` component
    - Verify no client-side Firebase SDK in bundle (check bundle size)
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ] 13.2 Verify responsive design across breakpoints
    - Confirm mobile-first layouts work at 320px, 768px, 1024px, 1440px, 2560px
    - Verify touch-friendly targets on mobile (min 44x44px)
    - Verify `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container pattern
    - _Requirements: 10.1, 10.2, 10.3_

  - [ ] 13.3 Accessibility audit
    - Run jest-axe across all page-level components
    - Verify color contrast ratios meet WCAG AA (4.5:1 normal text, 3:1 large text)
    - Confirm alt text on all images, semantic HTML, keyboard navigation
    - Verify all interactive elements are keyboard accessible
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

  - [ ] 13.4 HTTPS and security verification
    - Confirm Vercel serves all pages over HTTPS
    - Confirm HTTP → HTTPS redirect is active
    - Confirm no Firebase credentials exposed in client bundle
    - _Requirements: 14.1, 14.2, 14.3_

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document (Properties 1–12)
- Unit tests validate specific examples and edge cases
- All components use TypeScript with strict mode
- Firebase Admin SDK is used server-side only — no client-side Firebase config exposed
- ISR (revalidate: 3600) ensures product updates reflect within 1 hour without redeployment
- All pages served in Spanish (es-CO locale)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.5"] },
    { "id": 2, "tasks": ["1.4"] },
    { "id": 3, "tasks": ["2.1", "2.2", "2.3", "2.4"] },
    { "id": 4, "tasks": ["2.5", "3.1"] },
    { "id": 5, "tasks": ["2.6", "3.2"] },
    { "id": 6, "tasks": ["5.1", "5.2", "5.3", "6.1"] },
    { "id": 7, "tasks": ["5.4", "6.2", "6.4"] },
    { "id": 8, "tasks": ["5.5", "5.6", "6.3"] },
    { "id": 9, "tasks": ["6.5", "8.1", "8.2", "8.3"] },
    { "id": 10, "tasks": ["8.4", "9.1"] },
    { "id": 11, "tasks": ["8.5", "10.1", "10.2"] },
    { "id": 12, "tasks": ["10.3"] },
    { "id": 13, "tasks": ["10.4", "10.5", "12.1", "12.2"] },
    { "id": 14, "tasks": ["12.3", "13.1", "13.2", "13.3", "13.4"] }
  ]
}
```
