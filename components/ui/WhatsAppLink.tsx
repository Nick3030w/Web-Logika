/**
 * Builds a WhatsApp wa.me URL with the given phone number and pre-filled message.
 *
 * @param phone - The phone number in international format (e.g., "57XXXXXXXXXX")
 * @param message - The message to pre-fill in WhatsApp
 * @returns The complete WhatsApp URL
 *
 * @example
 * buildWhatsAppUrl('573001234567', 'Hola')
 * // Returns: 'https://wa.me/573001234567?text=Hola'
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
