/**
 * Tags related types and interfaces
 */

export interface Tag {
  id: number;
  name: string;
}

export interface CreateTagRequest {
  name: string;
}

export interface UpdateTagRequest {
  name: string;
}

export interface TagListParams {
  limit?: number;
  offset?: number;
}