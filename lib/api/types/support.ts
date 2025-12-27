/**
 * Support Types
 * Types for support/contact form operations
 */

export interface ContactSupportRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactSupportResponse {
  success: boolean;
  message?: string;
}
