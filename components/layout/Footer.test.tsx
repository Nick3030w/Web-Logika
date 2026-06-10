import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Footer from './Footer';

expect.extend(toHaveNoViolations);

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('should render the logo', () => {
      render(<Footer />);
      const logo = screen.getByText('Logika');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass('text-accent');
    });

    it('should render company description', () => {
      render(<Footer />);
      const description = screen.getByText(/Fábrica de muebles a medida en Bogotá/i);
      expect(description).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      render(<Footer />);
      const links = ['Inicio', 'Catálogo', 'Nosotros', 'Contacto'];
      links.forEach((label) => {
        const links = screen.getAllByText(label);
        expect(links.length).toBeGreaterThan(0);
      });
    });

    it('should render social media icons (Instagram and WhatsApp)', () => {
      render(<Footer />);
      const instagramLinks = screen.getAllByLabelText('Instagram');
      const whatsappLinks = screen.getAllByLabelText('WhatsApp');
      expect(instagramLinks.length).toBeGreaterThan(0);
      expect(whatsappLinks.length).toBeGreaterThan(0);
    });

    it('should render contact information', () => {
      render(<Footer />);
      const bogota = screen.getByText('Bogotá, Colombia');
      expect(bogota).toBeInTheDocument();
    });

    it('should render copyright notice with current year', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      // Look for the copyright year anywhere in the footer
      const footer = screen.getByRole('contentinfo');
      expect(footer.textContent).toContain(currentYear.toString());
      expect(footer.textContent).toContain('Logika Decoración');
    });
  });

  describe('Navigation Links', () => {
    it('should have correct href attributes for footer navigation', () => {
      render(<Footer />);
      
      const expectedLinks = [
        { label: 'Inicio', href: '/' },
        { label: 'Catálogo', href: '/catalogo' },
        { label: 'Nosotros', href: '/nosotros' },
        { label: 'Contacto', href: '/contacto' },
      ];
      
      expectedLinks.forEach(({ label, href }) => {
        const links = screen.getAllByText(label).filter(el => el.tagName === 'A');
        const foundLink = links.find(link => link.getAttribute('href') === href);
        expect(foundLink).toBeInTheDocument();
      });
    });

    it('should have external links with proper attributes', () => {
      render(<Footer />);
      
      const externalLinks = [
        { text: 'WhatsApp', href: 'https://wa.me/57' },
        { text: 'Instagram', href: 'https://instagram.com/logikadecoracion' },
      ];
      
      externalLinks.forEach(({ text, href }) => {
        const links = screen.getAllByText(text);
        const externalLink = links.find(
          link => link.getAttribute('href') === href && link.getAttribute('target') === '_blank'
        );
        expect(externalLink).toBeInTheDocument();
        expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Sections', () => {
    it('should render Navigation section', () => {
      render(<Footer />);
      const navSection = screen.getByText(/Navegación/i);
      expect(navSection).toBeInTheDocument();
    });

    it('should render Contact section', () => {
      render(<Footer />);
      // Query for the Contact section heading specifically by role
      const headings = screen.getAllByRole('heading');
      const contactHeading = headings.find(h => h.textContent === 'Contacto');
      expect(contactHeading).toBeInTheDocument();
    });

    it('should render Social section', () => {
      render(<Footer />);
      const socialSection = screen.getByText(/Síguenos/i);
      expect(socialSection).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic HTML', () => {
      render(<Footer />);
      
      // Should have footer element
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      
      // Should have nav elements
      const navs = screen.getAllByRole('navigation');
      expect(navs.length).toBeGreaterThan(0);
    });

    it('should have aria-labels on social icons', () => {
      render(<Footer />);
      
      const instagramLinks = screen.getAllByLabelText('Instagram');
      const whatsappLinks = screen.getAllByLabelText('WhatsApp');
      
      expect(instagramLinks.length).toBeGreaterThan(0);
      expect(whatsappLinks.length).toBeGreaterThan(0);
    });

    it('should be keyboard navigable', () => {
      render(<Footer />);
      
      // Get all focusable elements (links)
      const links = screen.getAllByRole('link');
      
      // Should have many links (footer, nav, social)
      expect(links.length).toBeGreaterThan(5);
      
      // Check for focus ring styles
      links.forEach((link) => {
        const classes = link.getAttribute('class') || '';
        expect(classes).toMatch(/focus:outline-none|focus:ring/);
      });
    });
  });

  describe('Styling', () => {
    it('should have dark primary background', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-primary');
    });

    it('should have white text', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('text-white');
    });

    it('should have accent colored logo', () => {
      render(<Footer />);
      const logo = screen.getByText('Logika');
      expect(logo).toHaveClass('text-accent');
    });
  });
});
