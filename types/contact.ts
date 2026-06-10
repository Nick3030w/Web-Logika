export interface ContactFormData {
  name: string;
  phone: string;
  productInterest: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  createdAt: Date;
}
