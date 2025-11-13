/**
 * Authentication Hooks
 * React Query hooks for authentication operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authenticationService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import { tokenManager } from "@/lib/utils/token-manager";
import { getErrorMessage } from "@/lib/utils/api-error-handler";
import {
  SignUpRequest,
  SignInRequest,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
} from "@/lib/api/types";

/**
 * Get current authenticated user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      if (!tokenManager.isAuthenticated()) {
        return null;
      }
      return authenticationService.getCurrentUser();
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Sign up mutation
 */
export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignUpRequest) =>
      authenticationService.signUp(payload),
    onSuccess: (data) => {
      tokenManager.setTokens(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
    },
    onError: (error) => {
      console.error("Sign up failed:", getErrorMessage(error));
    },
  });
}

/**
 * Sign in mutation
 */
export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignInRequest) =>
      authenticationService.signIn(payload),
    onSuccess: (data) => {
      tokenManager.setTokens(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
    },
    onError: (error) => {
      console.error("Sign in failed:", getErrorMessage(error));
    },
  });
}

/**
 * Sign out mutation
 */
export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authenticationService.signOut(),
    onSuccess: () => {
      tokenManager.clearTokens();
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Sign out failed:", getErrorMessage(error));
    },
  });
}

/**
 * Close all sessions mutation
 */
export function useCloseAllSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authenticationService.closeAllSessions(),
    onSuccess: () => {
      tokenManager.clearTokens();
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Close all sessions failed:", getErrorMessage(error));
    },
  });
}

/**
 * Request password reset mutation
 */
export function useRequestResetPassword() {
  return useMutation({
    mutationFn: (payload: RequestResetPasswordRequest) =>
      authenticationService.requestResetPassword(payload),
    onError: (error) => {
      console.error("Request reset password failed:", getErrorMessage(error));
    },
  });
}

/**
 * Reset password mutation
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) =>
      authenticationService.resetPassword(payload),
    onError: (error) => {
      console.error("Reset password failed:", getErrorMessage(error));
    },
  });
}

/**
 * Get Facebook OAuth URL
 */
export function useFacebookAuthUrl() {
  return useQuery({
    queryKey: ["auth", "facebook-url"],
    queryFn: () => authenticationService.getFacebookAuthUrl(),
    enabled: false, 
  });
}

/**
 * Get Google OAuth URL
 */
export function useGoogleAuthUrl() {
  return useQuery({
    queryKey: ["auth", "google-url"],
    queryFn: () => authenticationService.getGoogleAuthUrl(),
    enabled: false, 
  });
}
