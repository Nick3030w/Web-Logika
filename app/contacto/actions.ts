'use server';

import { ContactFormData } from '@/types/contact';
import { saveContact } from '@/lib/firestore/contacts';

export type ActionResult =
  | { status: 'success' }
  | { status: 'error'; message: string };

function validatePhone(phone: string): boolean {
  return /^3\d{9}$/.test(phone);
}

function validateName(name: string): boolean {
  return name.trim().length > 0 && name.trim().length <= 100;
}

function validateMessage(message: string): boolean {
  return message.trim().length <= 500;
}

export async function submitContactForm(data: ContactFormData): Promise<ActionResult> {
  // Server-side validation
  if (!validateName(data.name)) {
    return { status: 'error', message: 'El nombre es obligatorio y no puede superar 100 caracteres.' };
  }

  if (!validatePhone(data.phone)) {
    return { status: 'error', message: 'El teléfono debe ser un número colombiano de 10 dígitos que inicie con 3.' };
  }

  if (!data.productInterest) {
    return { status: 'error', message: 'Selecciona un producto de interés.' };
  }

  if (!validateMessage(data.message)) {
    return { status: 'error', message: 'El mensaje no puede superar 500 caracteres.' };
  }

  try {
    await saveContact({
      name: data.name.trim(),
      phone: data.phone.trim(),
      productInterest: data.productInterest,
      message: data.message.trim(),
    });
    return { status: 'success' };
  } catch {
    return { status: 'error', message: 'Hubo un error al enviar el formulario. Inténtalo de nuevo.' };
  }
}
