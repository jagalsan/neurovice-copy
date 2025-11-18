/**
 * Blog related types and interfaces
 */

export type BlogPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type BlogCommentStatus = "PENDING" | "PUBLISHED" | "REJECTED";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  status: BlogPostStatus;
  publishedAt: string | null;
  authorId: number | null;
  author: UserSimple | null;
  createdAt: string;
  updatedAt: string;
  comments: BlogComment[] | null;
}

export interface BlogPostInput {
  title: string;
  slug?: string;
  excerpt?: string | null;
  content: string;
  coverImageUrl?: string | null;
  status?: BlogPostStatus;
  publishedAt?: string | null;
}

export interface BlogComment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  status: BlogCommentStatus;
  createdAt: string;
  updatedAt: string;
  user: UserSimple | null;
}

export interface BlogCommentInput {
  content: string;
}

export interface BlogListParams {
  limit?: number;
  offset?: number;
  searchText?: string;
}

export interface BlogAdminListParams extends BlogListParams {
  status?: BlogPostStatus;
}

export interface UserSimple {
  id: number;
  name: string;
  lastName: string;
  email: string;
}
