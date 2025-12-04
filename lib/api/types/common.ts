/**
 * Common types and interfaces used across the API
 */

import { SceneWithAccess } from "./scenes";

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  //TODO: DELETE SCENES, PORNSTARS, SEASONS cuando backend esté actualizado
  pornStars?: T[];
  scenes?: T[];
  seasons?: T[];
  results: T[];
  total: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface SearchParams extends PaginationParams {
  searchText?: string;
}

export enum SubscriptionStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  PAUSED = "PAUSED",
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}