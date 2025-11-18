/**
 * Users Service
 * Handles user-profile related API calls
 */

import { apiClient } from "../client/axios-client";
import { UpdateUserPhoneRequest, UpdateUserLanguageRequest } from "../types";

class UsersService {
  private readonly basePath = "/users";

  /**
   * Update user phone
   */
  async updatePhone(payload: UpdateUserPhoneRequest): Promise<void> {
    await apiClient.put(`${this.basePath}/update_phone`, payload);
  }

  /**
   * Update user language
   */
  async updateLanguage(payload: UpdateUserLanguageRequest): Promise<void> {
    await apiClient.put(`${this.basePath}/update_language`, payload);
  }
}

export const usersService = new UsersService();
