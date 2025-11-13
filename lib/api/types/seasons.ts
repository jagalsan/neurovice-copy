/**
 * Seasons related types and interfaces
 */

export interface Season {
  id: number;
  title: string;
  description?: string;
  color?: string;
}

export interface CreateSeasonRequest {
  title: string;
  description?: string;
  color?: string;
}

export interface UpdateSeasonRequest {
  title?: string;
  description?: string;
  color?: string;
}

export interface SeasonListParams {
  limit?: number;
  offset?: number;
  searchText?: string;
}

export interface SetSeasonImagesRequest {
  images: string[];
}

export interface SetSeasonTrailersRequest {
  trailers: string[];
}