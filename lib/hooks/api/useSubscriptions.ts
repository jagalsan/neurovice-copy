/**
 * Subscriptions Hooks
 * React Query hooks for subscription operations
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { subscriptionsService } from "@/lib/api/services";
import { queryKeys } from "@/lib/utils/query-keys";
import { SubscriptionListParams } from "@/lib/api/types";

/**
 * Get user's own subscriptions
 */
export function useUserSubscriptions() {
  return useQuery({
    queryKey: queryKeys.subscriptions.user(),
    queryFn: () => subscriptionsService.getUserSubscriptions(),
  });
}

/**
 * Get all subscriptions (admin)
 */
export function useAdminSubscriptions(params?: SubscriptionListParams) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.subscriptions.list(params as Record<string, unknown>)],
    queryFn: () => subscriptionsService.getAdminSubscriptions(params),
  });
}

/**
 * Get subscription by ID (admin)
 */
export function useAdminSubscription(subscriptionId: number, enabled = true) {
  return useQuery({
    queryKey: ["admin", ...queryKeys.subscriptions.detail(subscriptionId)],
    queryFn: () =>
      subscriptionsService.getAdminSubscriptionById(subscriptionId),
    enabled,
  });
}
