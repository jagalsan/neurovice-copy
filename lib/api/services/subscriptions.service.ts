/**
 * Subscriptions Service
 * Handles all subscription-related API calls
 */

import { apiClient } from "../client/axios-client";
import {
  SubscriptionListItem,
  SubscriptionDetail,
  SubscriptionListParams,
  PaginatedResponse,
} from "../types";

class SubscriptionsService {
  private readonly adminBasePath = "/admin/subscriptions";
  private readonly basePath = "/subscriptions";

  /**
   * Get all subscriptions (admin)
   */
  async getAdminSubscriptions(
    params?: SubscriptionListParams
  ): Promise<PaginatedResponse<SubscriptionListItem>> {
    const { data } = await apiClient.get<
      PaginatedResponse<SubscriptionListItem>
    >(this.adminBasePath, { params });
    return data;
  }

  /**
   * Get subscription by ID (admin)
   */
  async getAdminSubscriptionById(
    subscriptionId: number
  ): Promise<SubscriptionDetail> {
    const { data } = await apiClient.get<SubscriptionDetail>(
      `${this.adminBasePath}/${subscriptionId}`
    );
    return data;
  }


  /**
   * Get user's own subscriptions
   */
  async getUserSubscriptions(): Promise<SubscriptionListItem[]> {
    const { data } = await apiClient.get<SubscriptionListItem[]>(
      `${this.basePath}/me`
    );
    return data;
  }
}

export const subscriptionsService = new SubscriptionsService();
