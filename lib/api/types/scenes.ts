/**
 * Scenes related types and interfaces
 */

import { Tag } from "./tags";
import { PornStar } from "./pornstars";

export interface ScenePrice {
  currency: string;
  amount: number;
}

export interface ScenePriceInput {
  currency: string;
  amount: number;
}

export interface SceneImage {
  id: number;
  sceneId: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SceneTrailer {
  id: number;
  sceneId: number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SceneTag {
  sceneId: number;
  tagId: number;
  tag: Tag;
}

export interface ScenePornStar {
  sceneId: number;
  pornStarId: number;
  pornStar: PornStar;
}

export interface Scene {
  id: number;
  title: string;
  description: string;
  public: boolean;
  hash?: string;
  mainImageUrl?: string | null;
  mainVideoUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  releaseDate?: string | null;
  language?: string | null;
  resolution?: string | null;
  degree?: string | null;
  fileSize?: string | null;
  prices: ScenePrice[];
  scenePornStars?: ScenePornStar[];
  seasonId?: number;
  season?: {
    id: number;
    title: string;
    description?: string;
    color?: string;
    mainImageUrl?: string;
    mainVideoUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
  sceneTags?: SceneTag[];
  sceneImages?: SceneImage[];
  sceneTrailers?: SceneTrailer[];
  accessible?: boolean;
}

export interface SceneWithAccess extends Scene {
  accessible: boolean;
}

export interface CreateSceneRequest {
  title: string;
  description: string;
  public?: boolean;
  hash?: string;
  prices: ScenePriceInput[];
  sceneTags?: Tag[];
  scenePornStars?: PornStar[];
}

export interface UpdateSceneRequest {
  title?: string;
  description?: string;
  public?: boolean;
  hash?: string;
  prices?: ScenePriceInput[];
}

export interface SceneAuthResponse {
  token: string;
}

export interface SceneDownloadResponse {
  url: string;
}

export interface SceneBuyPaypalResponse {
  approvalLink: string;
}

export interface SceneListParams {
  limit?: number;
  offset?: number;
  searchText?: string;
  season?: string;
}