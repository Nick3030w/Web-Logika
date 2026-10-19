import { render, screen, fireEvent } from '@testing-library/react';
import ProductCardImage from './ProductCardImage';

const SIZES = '(max-width: 640px) 100vw, 33vw';

// In the real card the image sits inside the product link. Focusing that link
// is the keyboard path that arms the second (hover) image.
function renderInLink(images: string[]) {
  return render(
    <a href="/x">
      <ProductCardImage images={images} name="Sofá Oslo" sizes={SIZES} />
    </a>
  );
}

function getByAltExact(alt: string) {
  return screen.getByAltText(alt);
}

describe('ProductCardImage', () => {
  // The hover image is the one whose src points at the second photo. Next's
  // <Image> rewrites src through /_next/image?url=..., so match on the encoded url.
  const hoverImageFor = (file: string) =>
    (screen.queryAllByRole('img') as HTMLImageElement[]).find((img) =>
      (img.getAttribute('src') ?? '').includes(encodeURIComponent(file))
    );

  describe('Single image', () => {
    it('renders the main image and never a hover image when only one photo exists', () => {
      renderInLink(['/a/01.jpg']);
      expect(getByAltExact('Sofá Oslo')).toBeInTheDocument();
      // Showing intent must not mount a second image: there is only one photo.
      fireEvent.focusIn(screen.getByRole('link'));
      expect(screen.getAllByRole('img')).toHaveLength(1);
    });

    it('does not fail when the images array is empty (placeholder fallback)', () => {
      render(<ProductCardImage images={[]} name="Sofá Oslo" sizes={SIZES} />);
      expect(getByAltExact('Sofá Oslo')).toBeInTheDocument();
    });

    it('treats a duplicated second image as a single image (no hover image)', () => {
      renderInLink(['/a/01.jpg', '/a/01.jpg']);
      fireEvent.focusIn(screen.getByRole('link'));
      expect(screen.getAllByRole('img')).toHaveLength(1);
    });
  });

  describe('Second image on intent (lazy)', () => {
    it('does not request the second image on first render (no intent yet)', () => {
      render(
        <ProductCardImage images={['/a/01.jpg', '/a/02.jpg']} name="Sofá Oslo" sizes={SIZES} />
      );
      // The hover image is only mounted after hover/focus/touch, so it must not
      // be requested up front. This guards against eager double downloads.
      expect(hoverImageFor('/a/02.jpg')).toBeUndefined();
      expect(getByAltExact('Sofá Oslo')).toBeInTheDocument();
    });
  });

  // Note: the hover/focus/touch cross-fade and the onError fallback are driven
  // by pointer/focus events that jsdom does not simulate faithfully; those paths
  // are verified in a real browser. The tests above cover the parts that are
  // deterministic in jsdom: lazy mounting and single/duplicate-image safety.
});
