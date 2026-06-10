import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import WhatsAppButton from './WhatsAppButton';
import { DEFAULT_WHATSAPP_MSG } from '@/constants/whatsapp';

expect.extend(toHaveNoViolations);

describe('WhatsAppButton Component', () => {
  describe('Rendering', () => {
    it('should render the WhatsApp button', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      expect(button).toBeInTheDocument();
    });

    it('should have correct aria-label', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      expect(button).toHaveAttribute('aria-label', 'Contactar por WhatsApp');
    });

    it('should have title attribute', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      expect(button).toHaveAttribute('title', 'Contactar por WhatsApp');
    });
  });

  describe('URL Generation', () => {
    it('should generate correct wa.me URL with default message', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      const href = button.getAttribute('href');
      
      expect(href).toContain('https://wa.me/573001234567');
      expect(href).toContain('text=');
      // Message should be URL encoded
      expect(href).toContain(encodeURIComponent(DEFAULT_WHATSAPP_MSG));
    });

    it('should accept custom phone number and message', () => {
      const customPhone = '573121234567';
      const customMessage = 'Mensaje personalizado';
      
      render(
        <WhatsAppButton
          phone={customPhone}
          message={customMessage}
        />
      );
      
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      const href = button.getAttribute('href');
      
      expect(href).toContain(`https://wa.me/${customPhone}`);
      expect(href).toContain(encodeURIComponent(customMessage));
    });

    it('should properly encode special characters in message', () => {
      const specialMessage = 'Hola, ¿cómo estás? Me interesa saber sobre: sofás & camas';
      
      render(
        <WhatsAppButton
          message={specialMessage}
          phone="573001234567"
        />
      );
      
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      const href = button.getAttribute('href');
      
      expect(href).toContain(encodeURIComponent(specialMessage));
      // Should not contain unencoded special characters in the text param
      const textParam = new URL(href).searchParams.get('text');
      expect(textParam).toBe(specialMessage);
    });
  });

  describe('Link Behavior', () => {
    it('should open in new tab', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      expect(button).toHaveAttribute('target', '_blank');
    });

    it('should have security attributes for external links', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      expect(button).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Styling', () => {
    it('should have fixed positioning classes', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      expect(button).toHaveClass('fixed', 'bottom-6', 'right-6', 'z-50');
    });

    it('should have accent background color', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      expect(button).toHaveClass('bg-accent');
    });

    it('should have rounded button appearance', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      expect(button).toHaveClass('rounded-full', 'p-4');
    });

    it('should have shadow and hover effects', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      const classes = button.getAttribute('class') || '';
      expect(classes).toMatch(/shadow/);
      expect(classes).toMatch(/hover:/);
    });
  });

  describe('Accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<WhatsAppButton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be keyboard focusable', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      
      // Links are naturally keyboard focusable
      expect(button).toBeInTheDocument();
      // Should have focus ring styling
      const classes = button.getAttribute('class') || '';
      expect(classes).toMatch(/focus:ring/);
    });

    it('should have high contrast colors', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      
      // Button should have accent background and white text for good contrast
      expect(button).toHaveClass('bg-accent', 'text-white');
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should not overlap page content on mobile', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('link', { name: /Contactar por WhatsApp/i });
      
      // Should have padding to avoid overlap with bottom content
      expect(button).toHaveClass('bottom-6', 'right-6');
      // Should not be hidden on mobile
      const classes = button.getAttribute('class') || '';
      expect(classes).not.toMatch(/md:hidden|lg:hidden/);
    });
  });
});
