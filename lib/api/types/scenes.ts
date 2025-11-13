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

export interface Scene {
  id: number;
  title: string;
  description: string;
  public: boolean;
  hash?: string;
  prices: ScenePrice[];
  scenePornStars?: PornStar[];
  seasonId?: number;
  sceneTags?: Tag[];
  sceneImages?: string[];
  sceneTrailers?: string[];
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