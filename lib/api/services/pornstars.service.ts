/**
 * PornStars Service
 * Handles all pornstars-related API calls
 */

import { apiClient } from "../client/axios-client";
import {
  PornStar,
  PornStarListParams,
  CreatePornStarRequest,
  UpdatePornStarRequest,
  PaginatedResponse,
} from "../types";

class PornStarsService {
  private readonly basePath = "/pornstars";
  private readonly adminBasePath = "/admin/pornstars";

  /**
   * Get pornstars list (client) - REQUIRES AUTH
   */
  async getPornStars(
    params?: PornStarListParams
  ): Promise<PaginatedResponse<PornStar>> {
    const { data } = await apiClient.get<PaginatedResponse<PornStar>>(
      this.basePath,
      { params }
    );
    return data;
  }

  /**
   * Get pornstar by ID (client) - REQUIRES AUTH
   */
  async getPornStarById(pornStarId: number): Promise<PornStar> {
    const { data } = await apiClient.get<PornStar>(
      `${this.basePath}/${pornStarId}`
    );
    return data;
  }

  /**
   * Get pornstars list (admin)
   */
  async getAdminPornStars(
    params?: PornStarListParams
  ): Promise<PaginatedResponse<PornStar>> {
    const { data } = await apiClient.get<PaginatedResponse<PornStar>>(
      this.adminBasePath,
      { params }
    );
    return data;
  }

  /**
   * Create new pornstar (admin)
   */
  async createPornStar(payload: CreatePornStarRequest): Promise<PornStar> {
    const { data } = await apiClient.post<PornStar>(
      this.adminBasePath,
      payload
    );
    return data;
  }

  /**
   * Get pornstar by ID (admin)
   */
  async getAdminPornStarById(pornStarId: number): Promise<PornStar> {
    const { data } = await apiClient.get<PornStar>(
      `${this.adminBasePath}/${pornStarId}`
    );
    return data;
  }

  /**
   * Update pornstar (admin)
   */
  async updatePornStar(
    pornStarId: number,
    payload: UpdatePornStarRequest
  ): Promise<PornStar> {
    const { data } = await apiClient.put<PornStar>(
      `${this.adminBasePath}/${pornStarId}`,
      payload
    );
    return data;
  }

  /**
   * Delete pornstar (admin)
   */
  async deletePornStar(pornStarId: number): Promise<void> {
    await apiClient.delete(`${this.adminBasePath}/${pornStarId}`);
  }
}

export const pornStarsService = new PornStarsService();
