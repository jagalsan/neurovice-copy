/**
 * Blog Hooks
 * React Query hooks for blog operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import {
  BlogPost,
  BlogPostInput,
  BlogCommentInput,
  BlogListParams,
  BlogAdminListParams,
} from "@/lib/api/types";
import { getErrorMessage } from "@/lib/utils/api-error-handler";

/**
 * Get published blog posts (client)
 */
export function useBlogPosts(params?: BlogListParams) {
  return useQuery({
    queryKey: queryKeys.blog.list(params as Record<string, unknown>),
    queryFn: () => blogService.getPosts(params),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep unused data in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
  });
}

/**
 * Get single blog post by slug (client)
 */
export function useBlogPost(slug: string, enabled = true) {
  return useQuery<BlogPost | undefined>({
    queryKey: queryKeys.blog.detail(slug),
    queryFn: () => blogService.getPostBySlug(slug),
    enabled,
  });
}

/**
 * Create blog comment (client)
 */
export function useCreateBlogComment(slug: string) {
  return useMutation({
    mutationFn: (payload: BlogCommentInput) =>
      blogService.createComment(slug, payload),
    onError: (error) => {
      console.error("Create blog comment failed:", getErrorMessage(error));
    },
  });
}

/**
 * Get blog posts (admin)
 */
export function useAdminBlogPosts(params?: BlogAdminListParams) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.blog.list(params as Record<string, unknown>)],
    queryFn: () => blogService.getAdminPosts(params),
  });
}

/**
 * Get blog post by ID (admin)
 */
export function useAdminBlogPost(id: number, enabled = true) {
  return useQuery<BlogPost | undefined>({
    queryKey: ["admin", ...queryKeys.blog.detail(id)],
    queryFn: () => blogService.getAdminPostById(id),
    enabled,
  });
}

/**
 * Create blog post (admin)
 */
export function useCreateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BlogPostInput) => blogService.createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blog.lists() });
    },
    onError: (error) => {
      console.error("Create blog post failed:", getErrorMessage(error));
    },
  });
}

/**
 * Update blog post (admin)
 */
export function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: BlogPostInput }) =>
      blogService.updatePost(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", ...queryKeys.blog.detail(variables.id)],
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.blog.lists() });
    },
    onError: (error) => {
      console.error("Update blog post failed:", getErrorMessage(error));
    },
  });
}

/**
 * Delete blog post (admin)
 */
export function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => blogService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blog.lists() });
    },
    onError: (error) => {
      console.error("Delete blog post failed:", getErrorMessage(error));
    },
  });
}
