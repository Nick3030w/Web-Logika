import Image from 'next/image';
import { BRAND_LOGO_SRC } from '@/constants/business';

interface BrandLogoProps {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
}

/**
 * Brand lockup based on the official logo: lowercase "logika" wordmark where the
 * "o" is replaced by the isometric cube, plus the turquoise tagline.
 *
 * Drop the official file at `public/brand/logika-logo.svg` and set
 * BRAND_LOGO_SRC in constants/business.ts to use the original artwork instead.
 */
export default function BrandLogo({
  compact = false,
  inverse = false,
  className = '',
}: BrandLogoProps) {
  if (BRAND_LOGO_SRC) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={BRAND_LOGO_SRC}
          alt="Logika Decoración"
          width={compact ? 152 : 196}
          height={compact ? 42 : 54}
          priority
          className="h-auto w-auto"
        />
      </span>
    );
  }

  const letterColor = inverse ? 'text-white/90' : 'text-brand-gray';
  const wordmarkSize = compact ? 'text-[1.6rem]' : 'text-[1.95rem]';
  const cubeSize = compact ? 'h-[1.15em] w-[1.15em]' : 'h-[1.2em] w-[1.2em]';

  return (
    <span className={`group inline-flex flex-col ${className}`}>
      <span
        aria-hidden="true"
        className={`flex items-center font-heading font-light lowercase tracking-[0.12em] ${wordmarkSize} ${letterColor}`}
      >
        <span>l</span>
        <svg
          viewBox="0 0 48 48"
          className={`${cubeSize} mx-[0.02em] transition-transform duration-700 ease-out group-hover:-translate-y-0.5 group-hover:rotate-[8deg]`}
        >
          <polygon points="24,3 45,15 24,27 3,15" fill="#E6E7E8" />
          <polygon points="3,15 24,27 24,45 3,33" fill="#16D8D4" />
          <polygon points="24,27 45,15 45,33 24,45" fill="#2B2D2F" />
          <polygon points="24,15 33,20 24,25 15,20" fill="#FFFFFF" />
          <polygon points="15,20 24,25 24,33 15,28" fill="#0FC3C0" />
          <polygon points="24,25 33,20 33,28 24,33" fill="#4A4D4F" />
        </svg>
        <span>gika</span>
      </span>

      {!compact && (
        <span className="mt-1.5 self-end text-[0.5rem] font-medium uppercase tracking-[0.2em] text-accent sm:text-[0.55rem]">
          Diseño arte y decoración
        </span>
      )}

      <span className="sr-only">Logika Decoración</span>
    </span>
  );
}
