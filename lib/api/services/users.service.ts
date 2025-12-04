/**
 * Users Service
 * Handles user-profile related API calls
 */

import { apiClient } from "../client/axios-client";
import { 
  User,
  MyUserResponse,
  UpdateUserDataRequest,
  UpdateUserPhoneRequest, 
  UpdateUserLanguageRequest 
} from "../types";

class UsersService {
  private readonly basePath = "/users";

  /**
   * Get current authenticated user data
   */
  async getMyUser(): Promise<MyUserResponse> {
    const { data } = await apiClient.get<MyUserResponse>(`${this.basePath}/my_user`);
    return data;
  }

  /**
   * Update user data (name, lastName, etc.)
   */
  async updateData(payload: UpdateUserDataRequest): Promise<User> {
    const { data } = await apiClient.put<User>(
      `${this.basePath}/update_data`,
      payload
    );
    return data;
  }

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
