/**
 * Blog Service
 * Handles all blog-related API calls
 */

import { apiClient } from "../client/axios-client";
import {
  BlogPost,
  BlogPostInput,
  BlogComment,
  BlogCommentInput,
  BlogListParams,
  BlogAdminListParams,
  PaginatedResponse,
} from "../types";

class BlogService {
  private readonly adminBasePath = "/admin/blog";
  private readonly clientBasePath = "/blog";

  /**
   * Get blog posts (admin)
   */
  async getAdminPosts(
    params?: BlogAdminListParams
  ): Promise<PaginatedResponse<BlogPost>> {
    const { data } = await apiClient.get<PaginatedResponse<BlogPost>>(
      this.adminBasePath,
      { params }
    );
    return data;
  }

  /**
   * Get single blog post by ID (admin)
   */
  async getAdminPostById(id: number): Promise<BlogPost> {
    const { data } = await apiClient.get<BlogPost>(
      `${this.adminBasePath}/${id}`
    );
    return data;
  }

  /**
   * Create blog post (admin)
   */
  async createPost(payload: BlogPostInput): Promise<BlogPost> {
    const { data } = await apiClient.post<BlogPost>(
      `${this.adminBasePath}/create`,
      payload
    );
    return data;
  }

  /**
   * Update blog post (admin)
   */
  async updatePost(id: number, payload: BlogPostInput): Promise<BlogPost> {
    const { data } = await apiClient.put<BlogPost>(
      `${this.adminBasePath}/${id}/update`,
      payload
    );
    return data;
  }

  /**
   * Delete blog post (admin)
   */
  async deletePost(id: number): Promise<{ ok: boolean }> {
    const { data } = await apiClient.delete<{ ok: boolean }>(
      `${this.adminBasePath}/${id}/delete`
    );
    return data;
  }

  /**
   * Get published blog posts (client)
   */
  async getPosts(
    params?: BlogListParams
  ): Promise<PaginatedResponse<BlogPost>> {
    const { data } = await apiClient.get<PaginatedResponse<BlogPost>>(
      `${this.clientBasePath}/posts`,
      { params }
    );
    return data;
  }

  /**
   * Get single published blog post by slug (client)
   */
  async getPostBySlug(slug: string): Promise<BlogPost> {
    const { data } = await apiClient.get<BlogPost>(
      `${this.clientBasePath}/posts/${slug}`
    );
    return data;
  }

  /**
   * Create comment on a blog post (client)
   */
  async createComment(
    slug: string,
    payload: BlogCommentInput
  ): Promise<BlogComment> {
    const { data } = await apiClient.post<BlogComment>(
      `${this.clientBasePath}/posts/${slug}/comments`,
      payload
    );
    return data;
  }
}

export const blogService = new BlogService();
