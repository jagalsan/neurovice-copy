/**
 * Scenes Service
 * Handles all scenes-related API calls
 */

import { apiClient } from "../client/axios-client";
import {
  Scene,
  SceneWithAccess,
  SceneListParams,
  CreateSceneRequest,
  UpdateSceneRequest,
  SceneAuthResponse,
  SceneDownloadResponse,
  SceneBuyPaypalResponse,
  PaginatedResponse,
} from "../types";

class ScenesService {
  private readonly basePath = "/scenes";
  private readonly adminBasePath = "/admin/scenes";

  /**
   * Get public scenes list (client) - REQUIRES AUTH
   */
  async getScenes(
    params?: SceneListParams
  ): Promise<PaginatedResponse<SceneWithAccess>> {
    const { data } = await apiClient.get<PaginatedResponse<SceneWithAccess>>(
      this.basePath,
      { params }
    );
    return data;
  }

  /**
   * Get owned scenes (client)
   */
  async getOwnedScenes(
    params?: SceneListParams
  ): Promise<PaginatedResponse<Scene>> {
    const { data } = await apiClient.get<PaginatedResponse<Scene>>(
      `${this.basePath}/owned`,
      { params }
    );
    return data;
  }

  /**
   * Get free scenes (client) - REQUIRES AUTH
   */
  async getFreeScenes(
    params?: SceneListParams
  ): Promise<PaginatedResponse<Scene>> {
    const { data } = await apiClient.get<PaginatedResponse<Scene>>(
      `${this.basePath}/free`,
      { params }
    );
    return data;
  }

  /**
   * Get scene by ID (client) - REQUIRES AUTH
   */
  async getSceneById(sceneId: number): Promise<Scene> {
    const { data } = await apiClient.get<Scene>(
      `${this.basePath}/${sceneId}`
    );
    return data;
  }

  /**
   * Get scene access token
   */
  async getSceneAuth(sceneId: number): Promise<SceneAuthResponse> {
    const { data } = await apiClient.get<SceneAuthResponse>(
      `${this.basePath}/${sceneId}/auth`
    );
    return data;
  }

  /**
   * Buy scene with PayPal
   */
  async buySceneWithPaypal(
    sceneId: number
  ): Promise<SceneBuyPaypalResponse> {
    const { data } = await apiClient.post<SceneBuyPaypalResponse>(
      `${this.basePath}/${sceneId}/buy/paypal`
    );
    return data;
  }

  /**
   * Request download token for scene
   */
  async requestSceneDownload(
    sceneId: number
  ): Promise<SceneDownloadResponse> {
    const { data } = await apiClient.post<SceneDownloadResponse>(
      `${this.basePath}/${sceneId}/request-download`
    );
    return data;
  }

  /**
   * Download scene with token
   */
  async downloadScene(
    sceneId: number,
    token: string
  ): Promise<SceneDownloadResponse> {
    const { data } = await apiClient.get<SceneDownloadResponse>(
      `${this.basePath}/${sceneId}/download/${token}`
    );
    return data;
  }

  /**
   * Get scenes list (admin)
   */
  async getAdminScenes(
    params?: SceneListParams
  ): Promise<PaginatedResponse<Scene>> {
    const { data } = await apiClient.get<PaginatedResponse<Scene>>(
      this.adminBasePath,
      { params }
    );
    return data;
  }

  /**
   * Create new scene (admin)
   */
  async createScene(payload: CreateSceneRequest): Promise<Scene> {
    const { data } = await apiClient.post<Scene>(this.adminBasePath, payload);
    return data;
  }

  /**
   * Get scene by ID (admin)
   */
  async getAdminSceneById(sceneId: number): Promise<Scene> {
    const { data } = await apiClient.get<Scene>(
      `${this.adminBasePath}/${sceneId}`
    );
    return data;
  }

  /**
   * Update scene (admin)
   */
  async updateScene(
    sceneId: number,
    payload: UpdateSceneRequest
  ): Promise<Scene> {
    const { data } = await apiClient.put<Scene>(
      `${this.adminBasePath}/${sceneId}`,
      payload
    );
    return data;
  }

  /**
   * Delete scene (admin)
   */
  async deleteScene(sceneId: number): Promise<void> {
    await apiClient.delete(`${this.adminBasePath}/${sceneId}`);
  }

  /**
   * Set scene hash (admin)
   */
  async setSceneHash(sceneId: number, hash: string): Promise<Scene> {
    const { data } = await apiClient.put<Scene>(
      `${this.adminBasePath}/${sceneId}/hash`,
      { hash }
    );
    return data;
  }

  /**
   * Set scene images (admin)
   */
  async setSceneImages(sceneId: number, images: string[]): Promise<void> {
    await apiClient.put(`${this.adminBasePath}/${sceneId}/images`, {
      images,
    });
  }

  /**
   * Set scene trailers (admin)
   */
  async setSceneTrailers(sceneId: number, trailers: string[]): Promise<void> {
    await apiClient.put(`${this.adminBasePath}/${sceneId}/trailers`, {
      trailers,
    });
  }
}

export const scenesService = new ScenesService();
