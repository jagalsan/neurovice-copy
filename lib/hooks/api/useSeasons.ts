/**
 * Seasons Hooks
 * React Query hooks for seasons operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { seasonsService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import { getErrorMessage } from "@/lib/utils/api-error-handler";
import {
  SeasonListParams,
  CreateSeasonRequest,
  UpdateSeasonRequest,
  SetSeasonImagesRequest,
  SetSeasonTrailersRequest,
} from "@/lib/api/types";

/**
 * Get seasons list (client)
 */
export function useSeasons(params?: SeasonListParams) {
  return useQuery({
    queryKey: queryKeys.seasons.list(params as Record<string, unknown>),
    queryFn: () => seasonsService.getSeasons(params),
  });
}

/**
 * Get season by ID (client)
 */
export function useSeason(seasonId: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.seasons.detail(seasonId),
    queryFn: () => seasonsService.getSeasonById(seasonId),
    enabled,
  });
}

/**
 * Get seasons list (admin)
 */
export function useAdminSeasons(params?: SeasonListParams) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.seasons.list(params as Record<string, unknown>)],
    queryFn: () => seasonsService.getAdminSeasons(params),
  });
}

/**
 * Get season by ID (admin)
 */
export function useAdminSeason(seasonId: number, enabled = true) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.seasons.detail(seasonId)],
    queryFn: () => seasonsService.getAdminSeasonById(seasonId),
    enabled,
  });
}

/**
 * Create season (admin)
 */
export function useCreateSeason() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSeasonRequest) =>
      seasonsService.createSeason(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.seasons.lists() });
    },
    onError: (error) => {
      console.error("Create season failed:", getErrorMessage(error));
    },
  });
}

/**
 * Update season (admin)
 */
export function useUpdateSeason() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      seasonId,
      payload,
    }: {
      seasonId: number;
      payload: UpdateSeasonRequest;
    }) => seasonsService.updateSeason(seasonId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.seasons.detail(variables.seasonId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.seasons.lists() });
    },
    onError: (error) => {
      console.error("Update season failed:", getErrorMessage(error));
    },
  });
}

/**
 * Delete season (admin)
 */
export function useDeleteSeason() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (seasonId: number) => seasonsService.deleteSeason(seasonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.seasons.lists() });
    },
    onError: (error) => {
      console.error("Delete season failed:", getErrorMessage(error));
    },
  });
}

/**
 * Set season images (admin)
 */
export function useSetSeasonImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      seasonId,
      payload,
    }: {
      seasonId: number;
      payload: SetSeasonImagesRequest;
    }) => seasonsService.setSeasonImages(seasonId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.seasons.detail(variables.seasonId),
      });
    },
    onError: (error) => {
      console.error("Set season images failed:", getErrorMessage(error));
    },
  });
}

/**
 * Set season trailers (admin)
 */
export function useSetSeasonTrailers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      seasonId,
      payload,
    }: {
      seasonId: number;
      payload: SetSeasonTrailersRequest;
    }) => seasonsService.setSeasonTrailers(seasonId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.seasons.detail(variables.seasonId),
      });
    },
    onError: (error) => {
      console.error("Set season trailers failed:", getErrorMessage(error));
    },
  });
}
