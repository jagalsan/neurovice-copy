/**
 * Seasons Service
 * Handles all seasons-related API calls
 */

import { apiClient } from "../client/axios-client";
import {
  Season,
  SeasonListParams,
  CreateSeasonRequest,
  UpdateSeasonRequest,
  SetSeasonImagesRequest,
  SetSeasonTrailersRequest,
  PaginatedResponse,
} from "../types";

class SeasonsService {
  private readonly basePath = "/seasons";
  private readonly adminBasePath = "/admin/seasons";

  /**
   * Get seasons list (client) - REQUIRES AUTH
   */
  async getSeasons(
    params?: SeasonListParams
  ): Promise<PaginatedResponse<Season>> {
    const { data } = await apiClient.get<PaginatedResponse<Season>>(
      this.basePath,
      { params }
    );
    return data;
  }

  /**
   * Get season by ID (client) - REQUIRES AUTH
   */
  async getSeasonById(seasonId: number): Promise<Season> {
    const { data } = await apiClient.get<Season>(
      `${this.basePath}/${seasonId}`
    );
    return data;
  }

  /**
   * Get seasons list (admin)
   */
  async getAdminSeasons(
    params?: SeasonListParams
  ): Promise<PaginatedResponse<Season>> {
    const { data } = await apiClient.get<PaginatedResponse<Season>>(
      this.adminBasePath,
      { params }
    );
    return data;
  }

  /**
   * Create new season (admin)
   */
  async createSeason(payload: CreateSeasonRequest): Promise<Season> {
    const { data } = await apiClient.post<Season>(this.adminBasePath, payload);
    return data;
  }

  /**
   * Get season by ID (admin)
   */
  async getAdminSeasonById(seasonId: number): Promise<Season> {
    const { data } = await apiClient.get<Season>(
      `${this.adminBasePath}/${seasonId}`
    );
    return data;
  }

  /**
   * Update season (admin)
   */
  async updateSeason(
    seasonId: number,
    payload: UpdateSeasonRequest
  ): Promise<Season> {
    const { data } = await apiClient.put<Season>(
      `${this.adminBasePath}/${seasonId}`,
      payload
    );
    return data;
  }

  /**
   * Delete season (admin)
   */
  async deleteSeason(seasonId: number): Promise<void> {
    await apiClient.delete(`${this.adminBasePath}/${seasonId}`);
  }

  /**
   * Set season images (admin)
   */
  async setSeasonImages(
    seasonId: number,
    payload: SetSeasonImagesRequest
  ): Promise<void> {
    await apiClient.put(
      `${this.adminBasePath}/${seasonId}/images`,
      payload
    );
  }

  /**
   * Set season trailers (admin)
   */
  async setSeasonTrailers(
    seasonId: number,
    payload: SetSeasonTrailersRequest
  ): Promise<void> {
    await apiClient.put(
      `${this.adminBasePath}/${seasonId}/trailers`,
      payload
    );
  }
}

export const seasonsService = new SeasonsService();
