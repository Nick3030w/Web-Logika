import { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { DEFAULT_WHATSAPP_MSG } from '@/constants/whatsapp';

export const metadata: Metadata = {
  title: 'Contacto | Logika Decoración',
  description:
    'Contáctanos para cotizar tus muebles a medida. Escríbenos por WhatsApp o llena el formulario. Bogotá, Colombia.',
  openGraph: {
    title: 'Contacto | Logika Decoración',
    description:
      'Contáctanos para cotizar tus muebles a medida en Bogotá.',
    type: 'website',
    url: '/contacto',
  },
};

export default function ContactoPage() {
  const phone = process.env.WHATSAPP_PHONE || '573001234567';
  const whatsappUrl = buildWhatsAppUrl(phone, DEFAULT_WHATSAPP_MSG);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header className="text-center mb-12">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
          Contáctanos
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          ¿Tienes un proyecto en mente? Escríbenos y te asesoramos sin compromiso.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
        {/* Contact form */}
        <div className="lg:w-3/5">
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-border shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-primary mb-6">
              Envíanos un mensaje
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Sidebar with direct contact */}
        <aside className="lg:w-2/5 space-y-6">
          {/* WhatsApp direct */}
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-primary mb-2">
              WhatsApp Business
            </h3>
            <p className="text-sm text-text-muted mb-4">
              ¿Prefieres una respuesta más rápida? Escríbenos directamente por
              WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <MessageCircle size={18} />
              Abrir WhatsApp
            </a>
          </div>

          {/* Social */}
          <div className="p-6 bg-bg-subtle rounded-lg border border-border">
            <h3 className="font-semibold text-primary mb-2">
              Síguenos
            </h3>
            <p className="text-sm text-text-muted mb-4">
              Mira nuestros trabajos más recientes en redes sociales.
            </p>
            <a
              href="https://instagram.com/logikadecoracion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              @logikadecoracion
            </a>
          </div>

          {/* Location info */}
          <div className="p-6 bg-bg-subtle rounded-lg border border-border">
            <h3 className="font-semibold text-primary mb-2">
              Ubicación
            </h3>
            <p className="text-sm text-text-muted">
              Bogotá, Colombia. Atendemos toda la ciudad y alrededores con
              servicio de entrega directa.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
