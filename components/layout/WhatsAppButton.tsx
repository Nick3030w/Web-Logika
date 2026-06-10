'use client';

import { Send } from 'lucide-react';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { DEFAULT_WHATSAPP_MSG } from '@/constants/whatsapp';

interface WhatsAppButtonProps {
  message?: string;
  phone?: string;
}

export default function WhatsAppButton({
  message = DEFAULT_WHATSAPP_MSG,
  phone = '573001234567',
}: WhatsAppButtonProps) {
  const whatsappUrl = buildWhatsAppUrl(phone, message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-white rounded-full p-4 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary hover:scale-110"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <Send size={24} />
    </a>
  );
}
