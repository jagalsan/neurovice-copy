/**
 * Seasons related types and interfaces
 */

import { SceneWithAccess } from "./scenes";

export interface SeasonImage {
  id: number;
  seasonId: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeasonTrailer {
  id: number;
  seasonId: number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Season {
  id: number;
  title: string;
  description?: string;
  color?: string;
  mainImageUrl?: string;
  mainVideoUrl?: string;
  createdAt: string;
  updatedAt: string;
  scenes?: SceneWithAccess[];
  seasonImages?: SeasonImage[];
  seasonTrailers?: SeasonTrailer[];
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