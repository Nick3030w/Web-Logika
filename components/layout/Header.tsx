'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessagesSquare as Instagram, Menu, MessageCircle, X } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS } from '@/constants/business';
import { DEFAULT_WHATSAPP_MSG } from '@/constants/whatsapp';
import { NAV_LINKS } from '@/constants/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappUrl = buildWhatsAppUrl(
    BUSINESS.whatsappPhone,
    DEFAULT_WHATSAPP_MSG
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // While the mobile menu is open: lock body scroll, close on Escape, and keep
  // keyboard focus trapped inside the panel.
  useEffect(() => {
    if (!isMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = menuPanelRef.current;
    const getFocusable = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`bg-primary text-white sticky top-0 z-40 border-b transition-all duration-500 ${
        isScrolled
          ? 'border-white/10 shadow-lift backdrop-blur-md'
          : 'border-transparent shadow-none'
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className={`section-shell flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-[68px]' : 'h-[84px]'
        }`}
      >
        <Link
          href="/"
          className="rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-4 focus:ring-offset-primary"
          aria-label="Logika Decoración - Inicio"
        >
          <BrandLogo compact inverse />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline rounded px-1 py-2 text-sm font-medium text-white/80 transition-colors hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2.5 text-white/70 transition hover:bg-white/10 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Instagram"
          >
            <Instagram size={19} />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            aria-label="WhatsApp"
          >
            <MessageCircle size={18} />
            Cotizar
          </a>
        </div>

        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-full p-2.5 text-accent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent lg:hidden"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          ref={menuPanelRef}
          id="mobile-navigation"
          className="animate-fade-up border-t border-white/10 bg-primary lg:hidden"
        >
          <nav
            aria-label="Navegación móvil"
            className="section-shell flex flex-col gap-1 py-5"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-white/85 transition hover:bg-white/5 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Instagram"
              >
                <Instagram size={18} /> Instagram
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} /> Cotizar
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
