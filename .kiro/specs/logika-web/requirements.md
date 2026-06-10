# Requirements Document

## Introduction

Logika Decoración is a custom furniture and interior decoration company in Bogotá, Colombia. This website serves as a high-quality visual digital catalog that builds trust, showcases the portfolio, and converts visitors into WhatsApp contacts. It is NOT an e-commerce store — there is no shopping cart or payment gateway. The primary goal is lead generation through WhatsApp contact.

The site targets end customers in Bogotá seeking premium custom furniture, interior decorators needing a reliable manufacturer, and furniture distributors requiring outsourced production.

## Glossary

- **Website**: The Next.js 14 + TypeScript web application hosted on Vercel for Logika Decoración
- **Catalog**: The filterable product gallery organized by furniture category
- **Product_Page**: An individual page displaying detailed information and photos for a single product
- **WhatsApp_CTA**: A floating call-to-action button that opens WhatsApp Business with a predefined message
- **Contact_Form**: A simple form collecting visitor information and sending it to Firebase Firestore
- **Header**: The top navigation bar containing logo, menu links, and social media links
- **Footer**: The bottom section containing logo, navigation, social media, and contact info
- **Hero_Section**: The full-screen opening section of the home page with a premium product image
- **Firebase_Firestore**: The NoSQL cloud database used for product data and contact form submissions
- **Firebase_Storage**: The cloud storage service used for product images
- **SEO_Module**: The system components responsible for meta tags, sitemap, and Open Graph configuration
- **Category**: One of the product classifications: Sofás, Camas, Comedores, Sofacamas, Cortinería, Sillas, Diseños a medida

## Requirements

### Requirement 1: Home Page

**User Story:** As a visitor, I want to see a visually impactful landing page, so that I immediately understand the quality and style of Logika's furniture.

#### Acceptance Criteria

1. THE Website SHALL display a Hero_Section that occupies 100% of the viewport height, containing a high-resolution product image (minimum 1920px wide) and a brand tagline of no more than 120 characters
2. THE Website SHALL display navigation links to all 7 product categories (Sofás, Camas, Comedores, Sofacamas, Cortinería, Sillas, Diseños a medida) in a section immediately below the Hero_Section
3. THE Website SHALL display a "why choose us" section on the home page containing at least 3 company differentiators, each with a heading and a descriptive text
4. THE Website SHALL display the WhatsApp_CTA floating button on the home page
5. WHEN a visitor clicks a category link in the home page categories section, THE Website SHALL navigate to the Catalog filtered by the selected Category

### Requirement 2: Product Catalog Gallery

**User Story:** As a visitor, I want to browse products filtered by category, so that I can find furniture relevant to my needs.

#### Acceptance Criteria

1. WHEN a visitor navigates to the Catalog page without selecting a Category filter, THE Catalog SHALL display all products across all categories in a gallery grid layout
2. WHEN a visitor selects a Category filter, THE Catalog SHALL display only products belonging to that Category
3. THE Catalog SHALL display a product card for each product item containing: a photo in WebP format loaded lazily, the product name, and a description of no more than 120 characters
4. THE Catalog SHALL support the following categories: Sofás, Camas, Comedores, Sofacamas, Cortinería, Sillas, Diseños a medida
5. WHEN a visitor selects a product card, THE Catalog SHALL navigate to the product detail page at /catalogo/[slug]
6. IF a selected Category contains no products, THEN THE Catalog SHALL display a message indicating that no products are available in that category

### Requirement 3: Individual Product Page

**User Story:** As a visitor, I want to view detailed product information with multiple photos, so that I can evaluate the product before contacting Logika.

#### Acceptance Criteria

1. WHEN a visitor selects a product from the Catalog, THE Website SHALL navigate to the Product_Page with a unique URL following the pattern /catalogo/[slug]
2. IF the slug in the URL does not match any existing product in Firestore, THEN THE Website SHALL display a not-found message and provide navigation back to the Catalog
3. THE Product_Page SHALL display a photo gallery showing all images from the product's images array, allowing the visitor to browse between them one at a time
4. IF the product has fewer than 2 images, THEN THE Website SHALL display the available image without gallery navigation controls
5. THE Product_Page SHALL display the product name, the description, and the materials list
6. THE Product_Page SHALL display a WhatsApp contact button that opens a wa.me link using the product's whatsappMsg field as the pre-filled message
7. THE Product_Page SHALL include SEO meta tags containing the product name and description

### Requirement 4: About Page

**User Story:** As a visitor, I want to learn about Logika's history and processes, so that I can trust the quality of their craftsmanship.

#### Acceptance Criteria

1. THE Website SHALL display the About page at the URL path /nosotros
2. THE Website SHALL display a company history section on the About page that includes the founding context and the brand's evolution in custom furniture manufacturing
3. THE Website SHALL describe the manufacturing process on the About page and list the core materials used: high-density foams, selected woods, premium fabrics and upholstery, and precision stitching
4. THE Website SHALL display at least 2 photographs showing the manufacturing process or materials on the About page
5. THE Website SHALL present a differentiators section on the About page that states the superior material quality compared to mass-market alternatives as the primary quality standard
6. THE Website SHALL state the geographic service area (Bogotá, Colombia) on the About page

### Requirement 5: Contact Page

**User Story:** As a visitor, I want multiple ways to contact Logika, so that I can reach them through my preferred channel.

#### Acceptance Criteria

1. THE Website SHALL display the Contact page at the URL path /contacto
2. THE Website SHALL display a direct WhatsApp Business button with a predefined message on the Contact page
3. THE Contact_Form SHALL collect the following required fields: name (max 100 characters), phone number (Colombian format: 10 digits starting with 3), product of interest (dropdown with categories: Sofás, Camas, Comedores, Sofacamas, Cortinería, Sillas, Diseños a medida, Otro), and message (max 500 characters)
4. WHEN a visitor submits the Contact_Form with valid data, THE Website SHALL store the submission data in Firebase_Firestore and display a success confirmation message
5. IF a visitor submits the Contact_Form with missing required fields, THEN THE Website SHALL display specific field-level validation errors without clearing already-entered data
6. IF the Firebase_Firestore submission fails, THEN THE Website SHALL display an error message and allow the visitor to retry
7. THE Website SHALL display links to Instagram and active social networks on the Contact page

### Requirement 6: Floating WhatsApp Component

**User Story:** As a visitor, I want to contact Logika via WhatsApp from any page, so that I can reach them without navigating away.

#### Acceptance Criteria

1. THE WhatsApp_CTA SHALL be visible in the bottom-right corner on all pages of the Website
2. WHEN a visitor clicks the WhatsApp_CTA, THE Website SHALL open WhatsApp with the predefined message: "Hola Logika, me interesa conocer más sobre sus muebles."
3. WHILE the page is scrolling, THE WhatsApp_CTA SHALL remain fixed in the bottom-right corner of the viewport
4. WHILE the viewport width is below 768px, THE WhatsApp_CTA SHALL be sized and positioned so that it does not overlap page content or other interactive elements
5. THE WhatsApp_CTA SHALL include an accessible label indicating its purpose for screen readers

### Requirement 7: Header and Navigation

**User Story:** As a visitor, I want clear navigation, so that I can find any section of the website easily.

#### Acceptance Criteria

1. THE Header SHALL display the Logika logo
2. THE Header SHALL display navigation links: Inicio, Catálogo, Nosotros, Contacto
3. THE Header SHALL display links to Instagram and WhatsApp
4. WHEN the viewport width is below 768px, THE Header SHALL display a hamburger menu icon instead of expanded navigation links
5. WHEN a visitor activates the hamburger menu, THE Header SHALL display the navigation links in a mobile-friendly overlay

### Requirement 8: Footer

**User Story:** As a visitor, I want to access secondary information and links from the bottom of any page, so that I have consistent access to contact info and navigation.

#### Acceptance Criteria

1. THE Footer SHALL display the Logika logo and a brief company description
2. THE Footer SHALL display navigation links matching the Header menu
3. THE Footer SHALL display social media icons linking to Instagram and WhatsApp
4. THE Footer SHALL display contact information
5. THE Footer SHALL display a copyright notice

### Requirement 9: Basic SEO

**User Story:** As the business owner, I want the website to rank on Google for local furniture searches in Bogotá, so that potential customers find Logika organically.

#### Acceptance Criteria

1. THE SEO_Module SHALL generate a unique meta title (maximum 60 characters) and meta description (maximum 160 characters) for each page
2. THE SEO_Module SHALL generate an XML sitemap including all public pages and all published Product_Page URLs
3. THE SEO_Module SHALL generate Open Graph tags on each page including og:title, og:description, og:image, og:url, and og:type
4. THE SEO_Module SHALL include Schema.org LocalBusiness structured data in JSON-LD format containing business name, address, geographic coordinates, phone number, and business type
5. THE SEO_Module SHALL include a canonical URL meta tag on each page to prevent duplicate content indexing

### Requirement 10: Responsive Design

**User Story:** As a mobile user, I want the website to work flawlessly on my phone, so that I can browse products and contact Logika on the go.

#### Acceptance Criteria

1. THE Website SHALL implement a mobile-first responsive design
2. THE Website SHALL render correctly on viewports from 320px to 2560px wide
3. WHILE the viewport width is below 768px, THE Website SHALL prioritize vertical layouts and touch-friendly interaction targets

### Requirement 11: Performance Optimization

**User Story:** As a visitor on a mobile connection, I want the website to load quickly, so that I don't abandon it due to slow performance.

#### Acceptance Criteria

1. THE Website SHALL achieve a Largest Contentful Paint (LCP) below 2.5 seconds on a 4G connection
2. THE Website SHALL serve images in WebP format with appropriate compression
3. THE Website SHALL implement lazy loading for images below the viewport fold
4. THE Website SHALL pass Core Web Vitals assessment in green status

### Requirement 12: Content Updatability

**User Story:** As the business owner, I want to update the product catalog without code changes, so that I can add new products independently.

#### Acceptance Criteria

1. THE Website SHALL load product data from Firebase_Firestore at runtime
2. THE Website SHALL load product images from Firebase_Storage
3. WHEN a product is added or modified in Firebase_Firestore, THE Website SHALL reflect the change without requiring code deployment

### Requirement 13: Accessibility

**User Story:** As a visitor with accessibility needs, I want the website to be usable, so that I can browse products and contact Logika regardless of ability.

#### Acceptance Criteria

1. THE Website SHALL maintain a minimum color contrast ratio of 4.5:1 for normal text and 3:1 for large text
2. THE Website SHALL provide descriptive alt text for all product images
3. THE Website SHALL support full keyboard navigation for all interactive elements
4. THE Website SHALL use semantic HTML elements for proper screen reader interpretation

### Requirement 14: Security

**User Story:** As the business owner, I want the website to be secure, so that visitor data and business credentials are protected.

#### Acceptance Criteria

1. THE Website SHALL serve all pages exclusively over HTTPS
2. THE Website SHALL store Firebase credentials in server-side environment variables, not in client-side code
3. IF a visitor attempts to access the Website over HTTP, THEN THE Website SHALL redirect to HTTPS automatically
