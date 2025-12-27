/**
 * Support Service
 * Handles all support-related API calls
 */

import {
  ContactSupportRequest,
  ContactSupportResponse,
} from "../types";

class SupportService {
  /**
   * Send contact support request (mock - always returns true)
   */
  async contactSupport(payload: ContactSupportRequest): Promise<ContactSupportResponse> {
    // Mock implementation - always returns success
    // TODO: Replace with actual API call when backend is ready
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    
    console.log("Contact support request:", payload);
    
    return {
      success: true,
      message: "Your message has been sent successfully. We will get back to you soon.",
    };
  }
}

export const supportService = new SupportService();
