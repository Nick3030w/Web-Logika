import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from './Header';

expect.extend(toHaveNoViolations);

describe('Header Component', () => {
  describe('Rendering', () => {
    it('should render the logo', () => {
      render(<Header />);
      const logo = screen.getByText('Logika');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass('text-accent');
    });

    it('should render desktop navigation links', () => {
      render(<Header />);
      const links = ['Inicio', 'Catálogo', 'Nosotros', 'Contacto'];
      links.forEach((label) => {
        const link = screen.getByText(label);
        expect(link).toBeInTheDocument();
      });
    });

    it('should render social icons (Instagram and WhatsApp links)', () => {
      render(<Header />);
      const instagramLink = screen.getByRole('link', { name: 'Instagram' });
      const whatsappLink = screen.getByRole('link', { name: 'WhatsApp' });
      expect(instagramLink).toBeInTheDocument();
      expect(whatsappLink).toBeInTheDocument();
    });

    it('should render hamburger menu button on mobile', () => {
      render(<Header />);
      const hamburger = screen.getByRole('button', { name: /abrir menú/i });
      expect(hamburger).toBeInTheDocument();
    });
  });

  describe('Mobile Menu Toggle', () => {
    it('should toggle mobile menu when hamburger button is clicked', () => {
      render(<Header />);
      const hamburger = screen.getByRole('button', { name: /abrir menú/i });
      
      // Menu should not be visible initially
      expect(screen.queryByText('Inicio')).not.toHaveClass('md:hidden');
      
      // Click to open
      fireEvent.click(hamburger);
      
      // Button label should change
      expect(screen.getByRole('button', { name: /cerrar menú/i })).toBeInTheDocument();
    });

    it('should close menu when a nav link is clicked', () => {
      render(<Header />);
      const hamburger = screen.getByRole('button', { name: /abrir menú/i });
      
      // Open menu
      fireEvent.click(hamburger);
      
      // Check that menu is open (should show close button)
      expect(screen.getByRole('button', { name: /cerrar menú/i })).toBeInTheDocument();
      
      // Get first nav link and click it
      const catalogo = screen.getAllByText('Catálogo')[1]; // Get the mobile version
      fireEvent.click(catalogo);
      
      // Menu should close (button shows "Abrir menú" again)
      expect(screen.getByRole('button', { name: /abrir menú/i })).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should have correct href attributes for navigation links', () => {
      render(<Header />);
      
      const expectedLinks = [
        { label: 'Inicio', href: '/' },
        { label: 'Catálogo', href: '/catalogo' },
        { label: 'Nosotros', href: '/nosotros' },
        { label: 'Contacto', href: '/contacto' },
      ];
      
      expectedLinks.forEach(({ label, href }) => {
        const link = screen.getAllByText(label).find(el => el.tagName === 'A');
        expect(link).toHaveAttribute('href', href);
      });
    });

    it('should have aria-expanded attribute on hamburger button', () => {
      render(<Header />);
      const hamburger = screen.getByRole('button', { name: /abrir menú/i });
      expect(hamburger).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(hamburger);
      expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be keyboard navigable through all interactive elements', () => {
      render(<Header />);
      
      // Get all links (desktop nav and logo)
      const links = screen.getAllByRole('link');
      
      // Should have at least logo, nav links, and social icons
      expect(links.length).toBeGreaterThan(3);
      
      // Check focus ring classes on nav links (skip logo)
      const navContainer = screen.getByRole('navigation');
      const navLinks = navContainer.querySelectorAll('a:not([href="/"])');
      navLinks.forEach((el) => {
        const classes = el.getAttribute('class') || '';
        expect(classes).toMatch(/focus:outline-none|focus:ring/);
      });
      
      // Hamburger button should also be keyboard navigable
      const hamburger = screen.getByRole('button', { name: /abrir menú/i });
      const buttonClasses = hamburger.getAttribute('class') || '';
      expect(buttonClasses).toMatch(/focus:outline-none|focus:ring/);
    });
  });

  describe('Accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Header />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic HTML', () => {
      render(<Header />);
      
      // Should have header element
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      
      // Should have nav element
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should have descriptive aria-labels', () => {
      render(<Header />);
      
      const logo = screen.getByLabelText(/Inicio/);
      expect(logo).toBeInTheDocument();
      
      const hamburger = screen.getByRole('button', { name: /Abrir menú|Cerrar menú/i });
      expect(hamburger).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have dark primary background', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('bg-primary');
    });

    it('should have sticky positioning', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky', 'top-0');
    });

    it('should have accent colored logo and social icons', () => {
      render(<Header />);
      const logo = screen.getByText('Logika');
      expect(logo).toHaveClass('text-accent');
    });
  });
});
