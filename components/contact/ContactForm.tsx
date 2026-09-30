'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CATEGORIES } from '@/constants/categories';
import { BUSINESS } from '@/constants/business';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';

interface FormErrors {
  name?: string;
  phone?: string;
  productInterest?: string;
  message?: string;
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterest, setProductInterest] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length > 100) {
      nextErrors.name = 'Escribe tu nombre (máximo 100 caracteres).';
    }
    if (!/^3\d{9}$/.test(phone.trim())) {
      nextErrors.phone = 'Ingresa un celular colombiano de 10 dígitos.';
    }
    if (!productInterest) {
      nextErrors.productInterest = 'Selecciona lo que te interesa.';
    }
    if (message.trim().length > 500) {
      nextErrors.message = 'El mensaje no puede superar 500 caracteres.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    const category =
      CATEGORIES.find((item) => item.slug === productInterest)?.name ||
      productInterest;
    const whatsappMessage = [
      `Hola Logika, soy ${name.trim()}.`,
      `Me interesa: ${category}.`,
      message.trim() ? `Mi idea o necesidad: ${message.trim()}` : '',
      `Mi número de contacto es ${phone.trim()}.`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      buildWhatsAppUrl(BUSINESS.whatsappPhone, whatsappMessage),
      '_blank',
      'noopener,noreferrer'
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-primary">Nombre *</label>
        <input
          id="name"
          type="text"
          maxLength={100}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={`w-full rounded-xl border bg-bg-base px-4 py-3 outline-none transition focus:ring-2 focus:ring-accent ${errors.name ? 'border-red-400' : 'border-border'}`}
          placeholder="Tu nombre"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-primary">Celular *</label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={phone}
          onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
          className={`w-full rounded-xl border bg-bg-base px-4 py-3 outline-none transition focus:ring-2 focus:ring-accent ${errors.phone ? 'border-red-400' : 'border-border'}`}
          placeholder="300 123 4567"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && <p id="phone-error" className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="productInterest" className="mb-1.5 block text-sm font-semibold text-primary">Estoy buscando *</label>
        <select
          id="productInterest"
          value={productInterest}
          onChange={(event) => setProductInterest(event.target.value)}
          className={`w-full rounded-xl border bg-bg-base px-4 py-3 outline-none transition focus:ring-2 focus:ring-accent ${errors.productInterest ? 'border-red-400' : 'border-border'}`}
          aria-invalid={Boolean(errors.productInterest)}
          aria-describedby={errors.productInterest ? 'interest-error' : undefined}
        >
          <option value="">Selecciona una opción</option>
          {CATEGORIES.map((category) => (
            <option key={category.slug} value={category.slug}>{category.name}</option>
          ))}
          <option value="Visita al taller">Visita al taller</option>
          <option value="Otro proyecto">Otro proyecto</option>
        </select>
        {errors.productInterest && <p id="interest-error" className="mt-1.5 text-xs text-red-600">{errors.productInterest}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-primary">Cuéntanos tu idea</label>
        <textarea
          id="message"
          maxLength={500}
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`w-full resize-none rounded-xl border bg-bg-base px-4 py-3 outline-none transition focus:ring-2 focus:ring-accent ${errors.message ? 'border-red-400' : 'border-border'}`}
          placeholder="Medidas aproximadas, estilo, ciudad o cualquier detalle útil..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <div className="mt-1.5 flex justify-between text-xs text-text-muted">
          <span>{errors.message || 'Puedes completar los detalles en WhatsApp.'}</span>
          <span>{message.length}/500</span>
        </div>
      </div>

      <button type="submit" className="button-primary w-full">
        <MessageCircle size={19} /> Continuar por WhatsApp
      </button>
      <p className="text-center text-xs leading-5 text-text-muted">
        Al continuar se abrirá una conversación con la información que escribiste.
      </p>
    </form>
  );
}
