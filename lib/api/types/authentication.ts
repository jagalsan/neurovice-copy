/**
 * Authentication related types and interfaces
 */

export interface User {
  id: number;
  email: string;
  name: string;
  referralCode?: string;
  facebookId?: string;
  googleId?: string;
  createdAt: string;
  secretContent?: boolean;
  updatedAt: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  lastName: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RequestResetPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface OAuthCallbackParams {
  code: string;
  state: string;
}