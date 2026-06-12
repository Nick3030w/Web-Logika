'use client';

import { useState, useTransition } from 'react';
import { CATEGORIES } from '@/constants/categories';
import { submitContactForm, ActionResult } from '@/app/contacto/actions';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

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
  const [result, setResult] = useState<ActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function validateClient(): boolean {
    const newErrors: FormErrors = {};

    if (!name.trim() || name.trim().length > 100) {
      newErrors.name = 'El nombre es obligatorio (máx. 100 caracteres).';
    }

    if (!/^3\d{9}$/.test(phone.trim())) {
      newErrors.phone = 'Ingresa un número de 10 dígitos que inicie con 3.';
    }

    if (!productInterest) {
      newErrors.productInterest = 'Selecciona un producto de interés.';
    }

    if (message.trim().length > 500) {
      newErrors.message = 'El mensaje no puede superar 500 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!validateClient()) return;

    startTransition(async () => {
      const response = await submitContactForm({
        name: name.trim(),
        phone: phone.trim(),
        productInterest,
        message: message.trim(),
      });

      setResult(response);

      if (response.status === 'success') {
        setName('');
        setPhone('');
        setProductInterest('');
        setMessage('');
        setErrors({});
      }
    });
  }

  if (result?.status === 'success') {
    return (
      <div className="text-center py-10 px-6 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="font-heading text-xl font-semibold text-primary mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-text-muted">
          Gracias por contactarnos. Te responderemos lo antes posible.
        </p>
        <button
          onClick={() => setResult(null)}
          className="mt-6 text-accent hover:underline font-medium"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Server error */}
      {result?.status === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{result.message}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
          Nombre *
        </label>
        <input
          id="name"
          type="text"
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.name ? 'border-red-400' : 'border-border'
          } focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors`}
          placeholder="Tu nombre completo"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">
          Teléfono *
        </label>
        <input
          id="phone"
          type="tel"
          maxLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.phone ? 'border-red-400' : 'border-border'
          } focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors`}
          placeholder="3001234567"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="text-sm text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Product interest */}
      <div>
        <label htmlFor="productInterest" className="block text-sm font-medium text-primary mb-1">
          Producto de interés *
        </label>
        <select
          id="productInterest"
          value={productInterest}
          onChange={(e) => setProductInterest(e.target.value)}
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.productInterest ? 'border-red-400' : 'border-border'
          } focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors bg-white`}
          aria-invalid={!!errors.productInterest}
          aria-describedby={errors.productInterest ? 'interest-error' : undefined}
        >
          <option value="">Selecciona una opción</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
          <option value="otro">Otro</option>
        </select>
        {errors.productInterest && (
          <p id="interest-error" className="text-sm text-red-500 mt-1">{errors.productInterest}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          maxLength={500}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.message ? 'border-red-400' : 'border-border'
          } focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none`}
          placeholder="Cuéntanos qué necesitas..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-500 mt-1">{errors.message}</p>
        )}
        <p className="text-xs text-text-muted mt-1 text-right">
          {message.length}/500
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        {isPending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={18} />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  );
}
