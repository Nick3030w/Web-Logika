'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MessagesSquare, Send } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

const SOCIAL_LINKS = [
  {
    href: 'https://instagram.com/logikadecoracion',
    icon: MessagesSquare,
    label: 'Instagram',
    external: true,
  },
  {
    href: 'https://wa.me/57',
    icon: Send,
    label: 'WhatsApp',
    external: true,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-40 shadow-md">
      <nav className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl font-bold text-accent flex-shrink-0"
          aria-label="Logika Decoración - Inicio"
        >
          Logika
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary px-2 py-1 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Icons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-75 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded p-1"
                aria-label={link.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Hamburger Menu Button - Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-accent hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent rounded"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-gray-700">
          <nav className="flex flex-col px-4 sm:px-6 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-sm font-medium py-2 px-2 rounded hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              >
                {link.label}
              </Link>
            ))}

            {/* Social Icons - Mobile */}
            <div className="pt-4 border-t border-gray-700 flex gap-4 mt-2">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:opacity-75 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded p-2"
                    aria-label={link.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
