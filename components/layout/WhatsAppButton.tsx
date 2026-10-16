'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS } from '@/constants/business';
import { DEFAULT_WHATSAPP_MSG } from '@/constants/whatsapp';

interface WhatsAppButtonProps {
  message?: string;
  phone?: string;
}

export default function WhatsAppButton({
  message = DEFAULT_WHATSAPP_MSG,
  phone = BUSINESS.whatsappPhone,
}: WhatsAppButtonProps) {
  const whatsappUrl = buildWhatsAppUrl(phone, message);
  // Hide the floating button once the footer is visible: the footer already
  // offers WhatsApp, so this avoids a duplicate CTA stacked over the content.
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-accent p-4 text-primary shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 sm:px-5 ${
        isFooterVisible
          ? 'pointer-events-none translate-y-4 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
      aria-hidden={isFooterVisible}
      tabIndex={isFooterVisible ? -1 : undefined}
    >
      <MessageCircle size={24} />
      <span className="hidden text-sm font-semibold sm:inline">Hablemos</span>
    </a>
  );
}
