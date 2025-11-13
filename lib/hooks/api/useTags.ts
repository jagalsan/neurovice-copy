/**
 * Tags Hooks
 * React Query hooks for tags operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tagsService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import { getErrorMessage } from "@/lib/utils/api-error-handler";
import {
  TagListParams,
  CreateTagRequest,
  UpdateTagRequest,
} from "@/lib/api/types";

/**
 * Get tags list (client)
 */
export function useTags(params?: TagListParams) {
  return useQuery({
    queryKey: queryKeys.tags.list(params as Record<string, unknown>),
    queryFn: () => tagsService.getTags(params),
  });
}

/**
 * Get tag by ID (client)
 */
export function useTag(tagId: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.tags.detail(tagId),
    queryFn: () => tagsService.getTagById(tagId),
    enabled,
  });
}

/**
 * Get tags list (admin)
 */
export function useAdminTags(params?: TagListParams) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.tags.list(params as Record<string, unknown>)],
    queryFn: () => tagsService.getAdminTags(params),
  });
}

/**
 * Get tag by ID (admin)
 */
export function useAdminTag(tagId: number, enabled = true) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.tags.detail(tagId)],
    queryFn: () => tagsService.getAdminTagById(tagId),
    enabled,
  });
}

/**
 * Create tag (admin)
 */
export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTagRequest) =>
      tagsService.createTag(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.lists() });
    },
    onError: (error) => {
      console.error("Create tag failed:", getErrorMessage(error));
    },
  });
}

/**
 * Update tag (admin)
 */
export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tagId,
      payload,
    }: {
      tagId: number;
      payload: UpdateTagRequest;
    }) => tagsService.updateTag(tagId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tags.detail(variables.tagId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.lists() });
    },
    onError: (error) => {
      console.error("Update tag failed:", getErrorMessage(error));
    },
  });
}

/**
 * Delete tag (admin)
 */
export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tagId: number) => tagsService.deleteTag(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.lists() });
    },
    onError: (error) => {
      console.error("Delete tag failed:", getErrorMessage(error));
    },
  });
}
