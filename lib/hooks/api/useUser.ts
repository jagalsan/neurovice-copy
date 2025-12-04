/**
 * User Hooks
 * React Query hooks for user profile operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import { tokenManager } from "@/lib/utils/token-manager";
import { getErrorMessage } from "@/lib/utils/api-error-handler";
import {
  UpdateUserDataRequest,
  UpdateUserPhoneRequest,
  UpdateUserLanguageRequest,
} from "@/lib/api/types";

/**
 * Get current user profile data
 */
export function useMyUser() {
  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: async () => {
      if (!tokenManager.isAuthenticated()) {
        return null;
      }
      return usersService.getMyUser();
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Update user data mutation
 */
export function useUpdateUserData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserDataRequest) =>
      usersService.updateData(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
    onError: (error) => {
      console.error("Update user data failed:", getErrorMessage(error));
    },
  });
}

/**
 * Update user phone mutation
 */
export function useUpdateUserPhone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserPhoneRequest) =>
      usersService.updatePhone(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
    onError: (error) => {
      console.error("Update user phone failed:", getErrorMessage(error));
    },
  });
}

/**
 * Update user language mutation
 */
export function useUpdateUserLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserLanguageRequest) =>
      usersService.updateLanguage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
    onError: (error) => {
      console.error("Update user language failed:", getErrorMessage(error));
    },
  });
}
