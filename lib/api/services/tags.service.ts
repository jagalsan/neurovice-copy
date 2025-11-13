/**
 * Tags Service
 * Handles all tags-related API calls
 */

import { apiClient } from "../client/axios-client";
import {
  Tag,
  TagListParams,
  CreateTagRequest,
  UpdateTagRequest,
  PaginatedResponse,
} from "../types";

class TagsService {
  private readonly basePath = "/tags";
  private readonly adminBasePath = "/admin/tags";

  /**
   * Get tags list (client) - REQUIRES AUTH
   */
  async getTags(params?: TagListParams): Promise<PaginatedResponse<Tag>> {
    const { data } = await apiClient.get<PaginatedResponse<Tag>>(
      this.basePath,
      { params }
    );
    return data;
  }

  /**
   * Get tag by ID (client) - PUBLIC ENDPOINT
   */
  async getTagById(tagId: number): Promise<Tag> {
    const { data } = await apiClient.get<Tag>(
      `${this.basePath}/${tagId}`,
      {
        skipAuth: true
      }
    );
    return data;
  }

  /**
   * Get tags list (admin)
   */
  async getAdminTags(params?: TagListParams): Promise<PaginatedResponse<Tag>> {
    const { data } = await apiClient.get<PaginatedResponse<Tag>>(
      this.adminBasePath,
      { params }
    );
    return data;
  }

  /**
   * Create new tag (admin)
   */
  async createTag(payload: CreateTagRequest): Promise<Tag> {
    const { data } = await apiClient.post<Tag>(this.adminBasePath, payload);
    return data;
  }

  /**
   * Get tag by ID (admin)
   */
  async getAdminTagById(tagId: number): Promise<Tag> {
    const { data } = await apiClient.get<Tag>(
      `${this.adminBasePath}/${tagId}`
    );
    return data;
  }

  /**
   * Update tag (admin)
   */
  async updateTag(tagId: number, payload: UpdateTagRequest): Promise<Tag> {
    const { data } = await apiClient.put<Tag>(
      `${this.adminBasePath}/${tagId}`,
      payload
    );
    return data;
  }

  /**
   * Delete tag (admin)
   */
  async deleteTag(tagId: number): Promise<void> {
    await apiClient.delete(`${this.adminBasePath}/${tagId}`);
  }
}

export const tagsService = new TagsService();
