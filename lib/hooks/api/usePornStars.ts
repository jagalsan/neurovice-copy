/**
 * PornStars Hooks
 * React Query hooks for pornstars operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pornStarsService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import { getErrorMessage } from "@/lib/utils/api-error-handler";
import {
  PornStarListParams,
  CreatePornStarRequest,
  UpdatePornStarRequest,
} from "@/lib/api/types";

/**
 * Get pornstars list (client)
 */
export function usePornStars(params?: PornStarListParams) {
  return useQuery({
    queryKey: queryKeys.pornStars.list(params as Record<string, unknown>),
    queryFn: () => pornStarsService.getPornStars(params),
  });
}

/**
 * Get pornstar by ID (client)
 */
export function usePornStar(pornStarId: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.pornStars.detail(pornStarId),
    queryFn: () => pornStarsService.getPornStarById(pornStarId),
    enabled,
  });
}

/**
 * Get pornstars list (admin)
 */
export function useAdminPornStars(params?: PornStarListParams) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.pornStars.list(params as Record<string, unknown>)],
    queryFn: () => pornStarsService.getAdminPornStars(params),
  });
}

/**
 * Get pornstar by ID (admin)
 */
export function useAdminPornStar(pornStarId: number, enabled = true) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.pornStars.detail(pornStarId)],
    queryFn: () => pornStarsService.getAdminPornStarById(pornStarId),
    enabled,
  });
}

/**
 * Create pornstar (admin)
 */
export function useCreatePornStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePornStarRequest) =>
      pornStarsService.createPornStar(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pornStars.lists() });
    },
    onError: (error) => {
      console.error("Create pornstar failed:", getErrorMessage(error));
    },
  });
}

/**
 * Update pornstar (admin)
 */
export function useUpdatePornStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pornStarId,
      payload,
    }: {
      pornStarId: number;
      payload: UpdatePornStarRequest;
    }) => pornStarsService.updatePornStar(pornStarId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.pornStars.detail(variables.pornStarId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.pornStars.lists() });
    },
    onError: (error) => {
      console.error("Update pornstar failed:", getErrorMessage(error));
    },
  });
}

/**
 * Delete pornstar (admin)
 */
export function useDeletePornStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pornStarId: number) =>
      pornStarsService.deletePornStar(pornStarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pornStars.lists() });
    },
    onError: (error) => {
      console.error("Delete pornstar failed:", getErrorMessage(error));
    },
  });
}
