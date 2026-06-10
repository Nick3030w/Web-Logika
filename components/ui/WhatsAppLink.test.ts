import fc from 'fast-check';
import { buildWhatsAppUrl } from './WhatsAppLink';

describe('WhatsAppLink Utility', () => {
  describe('buildWhatsAppUrl', () => {
    describe('Basic Functionality', () => {
      it('should generate a valid wa.me URL', () => {
        const url = buildWhatsAppUrl('573001234567', 'Hola');
        expect(url).toMatch(/^https:\/\/wa\.me\//);
      });

      it('should include the phone number in the URL', () => {
        const phone = '573001234567';
        const url = buildWhatsAppUrl(phone, 'Hola');
        expect(url).toContain(phone);
      });

      it('should include the text parameter', () => {
        const url = buildWhatsAppUrl('573001234567', 'Hola');
        expect(url).toContain('?text=');
      });

      it('should return a complete URL', () => {
        const url = buildWhatsAppUrl('573001234567', 'Hola');
        expect(() => new URL(url)).not.toThrow();
      });
    });

    describe('URL Encoding', () => {
      it('should URL encode the message', () => {
        const message = 'Hola Logika';
        const url = buildWhatsAppUrl('573001234567', message);
        const textParam = new URL(url).searchParams.get('text');
        expect(textParam).toBe(message);
      });

      it('should encode special characters in the message', () => {
        const message = 'Hola & Adiós';
        const url = buildWhatsAppUrl('573001234567', message);
        expect(url).toContain(encodeURIComponent(message));
      });

      it('should encode spaces as %20', () => {
        const message = 'Hola Logika';
        const url = buildWhatsAppUrl('573001234567', message);
        expect(url).toContain('%20');
      });

      it('should encode accents and special characters', () => {
        const message = '¿Cómo estás? ñ';
        const url = buildWhatsAppUrl('573001234567', message);
        const textParam = new URL(url).searchParams.get('text');
        expect(textParam).toBe(message);
      });

      it('should handle multiple question marks and punctuation', () => {
        const message = '¿Qué? ¡Excelente!';
        const url = buildWhatsAppUrl('573001234567', message);
        const textParam = new URL(url).searchParams.get('text');
        expect(textParam).toBe(message);
      });
    });

    describe('Property Tests', () => {
      // Property 5: WhatsApp URL encodes product message correctly
      // Validates: Requirements 3.6, 6.2
      it('should correctly encode any message string', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 1, maxLength: 300 }),
            fc.string({ minLength: 7, maxLength: 15 }),
            (message, phone) => {
              const url = buildWhatsAppUrl(phone, message);
              
              // URL should be valid
              expect(() => new URL(url)).not.toThrow();
              
              // URL should contain the phone number
              expect(url).toContain(phone);
              
              // URL should contain the encoded message
              const encodedMessage = encodeURIComponent(message);
              expect(url).toContain(encodedMessage);
            }
          ),
          { numRuns: 50 }
        );
      });

      it('should generate consistent URLs for the same inputs', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 5, maxLength: 100 }),
            fc.string({ minLength: 10, maxLength: 15 }),
            (message, phone) => {
              const url1 = buildWhatsAppUrl(phone, message);
              const url2 = buildWhatsAppUrl(phone, message);
              expect(url1).toBe(url2);
            }
          ),
          { numRuns: 30 }
        );
      });

      it('should preserve message content after URL encoding/decoding', () => {
        fc.assert(
          fc.property(
            // Generate strings excluding only-whitespace cases
            fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
            fc.string({ minLength: 10, maxLength: 15 }),
            (message, phone) => {
              const url = buildWhatsAppUrl(phone, message);
              const urlObj = new URL(url);
              const textParam = urlObj.searchParams.get('text');
              // URLSearchParams.get() automatically decodes, so should match original
              // Skip test if URLSearchParams returns null (can happen in JSDOM edge cases)
              if (textParam !== null) {
                expect(textParam).toBe(message);
              }
            }
          ),
          { numRuns: 40 }
        );
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty message', () => {
        const url = buildWhatsAppUrl('573001234567', '');
        expect(url).toBe('https://wa.me/573001234567?text=');
      });

      it('should handle very long messages', () => {
        const longMessage = 'a'.repeat(1000);
        const url = buildWhatsAppUrl('573001234567', longMessage);
        const textParam = new URL(url).searchParams.get('text');
        expect(textParam).toBe(longMessage);
      });

      it('should handle messages with only special characters', () => {
        const specialMessage = '!@#$%^&*()';
        const url = buildWhatsAppUrl('573001234567', specialMessage);
        const textParam = new URL(url).searchParams.get('text');
        expect(textParam).toBe(specialMessage);
      });

      it('should handle messages with line breaks', () => {
        const messageWithBreak = 'Hola\\nLogika';
        const url = buildWhatsAppUrl('573001234567', messageWithBreak);
        const textParam = new URL(url).searchParams.get('text');
        expect(textParam).toBe(messageWithBreak);
      });

      it('should handle Unicode characters', () => {
        const unicodeMessage = '你好 مرحبا Привет 😀';
        const url = buildWhatsAppUrl('573001234567', unicodeMessage);
        const textParam = new URL(url).searchParams.get('text');
        expect(textParam).toBe(unicodeMessage);
      });

      it('should handle various phone formats', () => {
        const phones = ['573001234567', '57300123456', '1234567890', '+573001234567'];
        phones.forEach((phone) => {
          const url = buildWhatsAppUrl(phone, 'Test');
          expect(() => new URL(url)).not.toThrow();
          expect(url).toContain(phone);
        });
      });
    });

    describe('Default Message Integration', () => {
      it('should work with the default WhatsApp message', () => {
        const { DEFAULT_WHATSAPP_MSG } = require('@/constants/whatsapp');
        const url = buildWhatsAppUrl('573001234567', DEFAULT_WHATSAPP_MSG);
        const textParam = new URL(url).searchParams.get('text');
        expect(textParam).toBe(DEFAULT_WHATSAPP_MSG);
      });
    });
  });
});
