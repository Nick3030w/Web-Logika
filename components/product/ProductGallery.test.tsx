import { render, screen, fireEvent, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProductGallery from './ProductGallery';

expect.extend(toHaveNoViolations);

const IMAGES = [
  'https://storage.example.com/a/01.jpg',
  'https://storage.example.com/a/02.jpg',
  'https://storage.example.com/a/03.jpg',
];

describe('ProductGallery', () => {
  describe('Single media item', () => {
    it('does not render carousel controls when there is one image', () => {
      render(<ProductGallery images={[IMAGES[0]]} productName="Sofá Oslo" />);
      expect(screen.queryByRole('button', { name: 'Siguiente' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Anterior' })).not.toBeInTheDocument();
    });

    it('falls back to a placeholder when no images are provided', () => {
      render(<ProductGallery images={[]} productName="Sofá Oslo" />);
      // The main image still renders with a descriptive alt.
      expect(screen.getByAltText(/Sofá Oslo - imagen 1 de 1/)).toBeInTheDocument();
    });
  });

  describe('Multiple images', () => {
    it('shows the counter and thumbnails for each image', () => {
      render(<ProductGallery images={IMAGES} productName="Sofá Oslo" />);
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Ver imagen 1 de Sofá Oslo' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Ver imagen 3 de Sofá Oslo' })).toBeInTheDocument();
    });

    it('advances to the next image with the next button', () => {
      render(<ProductGallery images={IMAGES} productName="Sofá Oslo" />);
      fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });

    it('wraps around when going previous from the first image', () => {
      render(<ProductGallery images={IMAGES} productName="Sofá Oslo" />);
      fireEvent.click(screen.getByRole('button', { name: 'Anterior' }));
      expect(screen.getByText('3 / 3')).toBeInTheDocument();
    });

    it('jumps to an image when its thumbnail is clicked', () => {
      render(<ProductGallery images={IMAGES} productName="Sofá Oslo" />);
      fireEvent.click(screen.getByRole('button', { name: 'Ver imagen 3 de Sofá Oslo' }));
      expect(screen.getByText('3 / 3')).toBeInTheDocument();
    });

    it('navigates with the arrow keys', () => {
      render(<ProductGallery images={IMAGES} productName="Sofá Oslo" />);
      const region = screen.getByRole('region', { name: 'Galería de Sofá Oslo' });
      fireEvent.keyDown(region, { key: 'ArrowRight' });
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
      fireEvent.keyDown(region, { key: 'ArrowLeft' });
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });
  });

  describe('Videos', () => {
    it('labels video thumbnails distinctly from image thumbnails', () => {
      render(
        <ProductGallery
          images={[IMAGES[0]]}
          videos={['https://storage.example.com/a/clip.mp4']}
          productName="Sofá Oslo"
        />
      );
      expect(screen.getByRole('button', { name: 'Ver video 1 de Sofá Oslo' })).toBeInTheDocument();
    });
  });

  describe('Lightbox', () => {
    it('opens the lightbox from the "Ampliar" button and closes with the close button', () => {
      render(<ProductGallery images={IMAGES} productName="Sofá Oslo" />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagen para ver detalles' }));
      const dialog = screen.getByRole('dialog', { name: /Vista ampliada de Sofá Oslo/ });
      expect(dialog).toBeInTheDocument();

      fireEvent.click(within(dialog).getByRole('button', { name: 'Cerrar vista ampliada' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes the lightbox when Escape is pressed', () => {
      render(<ProductGallery images={IMAGES} productName="Sofá Oslo" />);
      fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagen para ver detalles' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<ProductGallery images={IMAGES} productName="Sofá Oslo" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
