/**
 * Scenes Hooks
 * React Query hooks for scenes operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scenesService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import { getErrorMessage } from "@/lib/utils/api-error-handler";
import {
  SceneListParams,
  CreateSceneRequest,
  UpdateSceneRequest,
} from "@/lib/api/types";

/**
 * Get scenes list (client)
 */
export function useScenes(params?: SceneListParams) {
  return useQuery({
    queryKey: queryKeys.scenes.list(params as Record<string, unknown>),
    queryFn: () => scenesService.getScenes(params),
  });
}

/**
 * Get owned scenes
 */
export function useOwnedScenes(params?: SceneListParams) {
  return useQuery({
    queryKey: queryKeys.scenes.owned(),
    queryFn: () => scenesService.getOwnedScenes(params),
  });
}

/**
 * Get free scenes
 */
export function useFreeScenes(params?: SceneListParams) {
  return useQuery({
    queryKey: queryKeys.scenes.free(),
    queryFn: () => scenesService.getFreeScenes(params),
  });
}

/**
 * Get scene by ID
 */
export function useScene(sceneId: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.scenes.detail(sceneId),
    queryFn: () => scenesService.getSceneById(sceneId),
    enabled,
  });
}

/**
 * Get scene access token
 */
export function useSceneAuth(sceneId: number, enabled = false) {
  return useQuery({
    queryKey: ["scenes", "auth", sceneId],
    queryFn: () => scenesService.getSceneAuth(sceneId),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Buy scene with PayPal
 */
export function useBuySceneWithPaypal() {
  return useMutation({
    mutationFn: (sceneId: number) =>
      scenesService.buySceneWithPaypal(sceneId),
    onError: (error) => {
      console.error("Buy scene failed:", getErrorMessage(error));
    },
  });
}

/**
 * Request scene download
 */
export function useRequestSceneDownload() {
  return useMutation({
    mutationFn: (sceneId: number) =>
      scenesService.requestSceneDownload(sceneId),
    onError: (error) => {
      console.error("Request download failed:", getErrorMessage(error));
    },
  });
}

/**
 * Get scenes list (admin)
 */
export function useAdminScenes(params?: SceneListParams) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.scenes.list(params as Record<string, unknown>)],
    queryFn: () => scenesService.getAdminScenes(params),
  });
}

/**
 * Get scene by ID (admin)
 */
export function useAdminScene(sceneId: number, enabled = true) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.scenes.detail(sceneId)],
    queryFn: () => scenesService.getAdminSceneById(sceneId),
    enabled,
  });
}

/**
 * Create scene (admin)
 */
export function useCreateScene() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSceneRequest) =>
      scenesService.createScene(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.scenes.lists() });
    },
    onError: (error) => {
      console.error("Create scene failed:", getErrorMessage(error));
    },
  });
}

/**
 * Update scene (admin)
 */
export function useUpdateScene() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sceneId,
      payload,
    }: {
      sceneId: number;
      payload: UpdateSceneRequest;
    }) => scenesService.updateScene(sceneId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.scenes.detail(variables.sceneId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.scenes.lists() });
    },
    onError: (error) => {
      console.error("Update scene failed:", getErrorMessage(error));
    },
  });
}

/**
 * Delete scene (admin)
 */
export function useDeleteScene() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sceneId: number) => scenesService.deleteScene(sceneId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.scenes.lists() });
    },
    onError: (error) => {
      console.error("Delete scene failed:", getErrorMessage(error));
    },
  });
}

/**
 * Set scene hash (admin)
 */
export function useSetSceneHash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sceneId, hash }: { sceneId: number; hash: string }) =>
      scenesService.setSceneHash(sceneId, hash),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.scenes.detail(variables.sceneId),
      });
    },
    onError: (error) => {
      console.error("Set scene hash failed:", getErrorMessage(error));
    },
  });
}

/**
 * Set scene images (admin)
 */
export function useSetSceneImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sceneId, images }: { sceneId: number; images: string[] }) =>
      scenesService.setSceneImages(sceneId, images),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.scenes.detail(variables.sceneId),
      });
    },
    onError: (error) => {
      console.error("Set scene images failed:", getErrorMessage(error));
    },
  });
}

/**
 * Set scene trailers (admin)
 */
export function useSetSceneTrailers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sceneId,
      trailers,
    }: {
      sceneId: number;
      trailers: string[];
    }) => scenesService.setSceneTrailers(sceneId, trailers),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.scenes.detail(variables.sceneId),
      });
    },
    onError: (error) => {
      console.error("Set scene trailers failed:", getErrorMessage(error));
    },
  });
}
