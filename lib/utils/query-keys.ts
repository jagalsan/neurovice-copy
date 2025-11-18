/**
 * React Query Keys Factory
 * Provides type-safe and organized query keys for React Query
 */

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },

  scenes: {
    all: ["scenes"] as const,
    lists: () => [...queryKeys.scenes.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.scenes.lists(), params] as const,
    owned: () => [...queryKeys.scenes.all, "owned"] as const,
    free: () => [...queryKeys.scenes.all, "free"] as const,
    detail: (id: number) => [...queryKeys.scenes.all, "detail", id] as const,
  },

  subscriptions: {
    all: ["subscriptions"] as const,
    lists: () => [...queryKeys.subscriptions.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.subscriptions.lists(), params] as const,
    detail: (id: number) =>
      [...queryKeys.subscriptions.all, "detail", id] as const,
    user: () => [...queryKeys.subscriptions.all, "user"] as const,
  },

  pornStars: {
    all: ["pornStars"] as const,
    lists: () => [...queryKeys.pornStars.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.pornStars.lists(), params] as const,
    detail: (id: number) =>
      [...queryKeys.pornStars.all, "detail", id] as const,
  },

  tags: {
    all: ["tags"] as const,
    lists: () => [...queryKeys.tags.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.tags.lists(), params] as const,
    detail: (id: number) => [...queryKeys.tags.all, "detail", id] as const,
  },

  seasons: {
    all: ["seasons"] as const,
    lists: () => [...queryKeys.seasons.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.seasons.lists(), params] as const,
    detail: (id: number) => [...queryKeys.seasons.all, "detail", id] as const,
  },

  blog: {
    all: ["blog"] as const,
    lists: () => [...queryKeys.blog.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.blog.lists(), params] as const,
    detail: (idOrSlug: number | string) =>
      [...queryKeys.blog.all, "detail", idOrSlug] as const,
  },
} as const;