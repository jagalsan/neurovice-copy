/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiClient } from "../client/axios-client";
import {
  SignUpRequest,
  SignInRequest,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  User,
} from "../types";

class AuthenticationService {
  private readonly basePath = "/authentication";

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const { data } = await apiClient.get<User>(this.basePath);
    return data;
  }

  /**
   * Sign up a new user
   */
  async signUp(payload: SignUpRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      `${this.basePath}/signup`,
      payload,
      { skipAuth: true }
    );
    return data;
  }

  /**
   * Sign in an existing user
   */
  async signIn(payload: SignInRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      `${this.basePath}/signin`,
      payload,
      { skipAuth: true }
    );
    return data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(
    payload: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const { data } = await apiClient.post<RefreshTokenResponse>(
      `${this.basePath}/refresh`,
      payload,
      { skipAuth: true }
    );
    return data;
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    await apiClient.post(`${this.basePath}/signout`);
  }

  /**
   * Close all active sessions
   */
  async closeAllSessions(): Promise<void> {
    await apiClient.post(`${this.basePath}/close-all-sessions`);
  }

  /**
   * Request password reset
   */
  async requestResetPassword(
    payload: RequestResetPasswordRequest
  ): Promise<void> {
    await apiClient.post(
      `${this.basePath}/request-reset-password`,
      payload,
      { skipAuth: true }
    );
  }

  /**
   * Reset password with token
   */
  async resetPassword(payload: ResetPasswordRequest): Promise<void> {
    await apiClient.post(
      `${this.basePath}/reset-password`,
      payload,
      { skipAuth: true }
    );
  }

  /**
   * Update password for authenticated user
   */
  async updatePassword(payload: UpdatePasswordRequest): Promise<void> {
    await apiClient.patch(`${this.basePath}/update-password`, payload);
  }

  /**
   * Get Facebook OAuth URL
   */
  async getFacebookAuthUrl(): Promise<string> {
    const { data } = await apiClient.get<string>(
      `${this.basePath}/facebook`,
      { skipAuth: true }
    );
    return data;
  }

  /**
   * Get Google OAuth URL
   */
  async getGoogleAuthUrl(): Promise<string> {
    const { data } = await apiClient.get<string>(
      `${this.basePath}/google`,
      { skipAuth: true }
    );
    return data;
  }
}

export const authenticationService = new AuthenticationService();