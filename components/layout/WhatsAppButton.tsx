'use client';

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

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-accent p-4 text-primary shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 sm:px-5"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="hidden text-sm font-semibold sm:inline">Hablemos</span>
    </a>
  );
}
