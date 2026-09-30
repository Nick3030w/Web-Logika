'use client';

import { useEffect, useRef, useState } from 'react';

type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'zoom';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

const HIDDEN: Record<RevealVariant, string> = {
  up: 'translate-y-8 opacity-0',
  fade: 'opacity-0',
  left: '-translate-x-8 opacity-0',
  right: 'translate-x-8 opacity-0',
  zoom: 'scale-95 opacity-0',
};

/**
 * Reveals content with a soft transition the first time it enters the viewport.
 * Honours `prefers-reduced-motion` through the global motion overrides.
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${
        isVisible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : HIDDEN[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
