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
  mainImageUrl?: string;
  mainVideoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
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
  
  // TODO: CAMPOS FALTANTES - Solicitar al backend:
  features?: string[];           // Lista de características (ROLEPLAY, FUN VIBRATORS, etc.)
  platforms?: string[];          // Plataformas soportadas (META QUEST, WINDOWS PCVR, etc.)
  releaseDate?: string;          // Fecha de lanzamiento
  language?: string;             // Idioma (ENGLISH, SPANISH, etc.)
  resolution?: string;           // Resolución (UP TO 8K, etc.)
  degree?: string;               // Grados de visión (195, 180, etc.)
  fileSize?: string;             // Tamaño del archivo (14.6GB, etc.)
  requirements?: {               // Requisitos del sistema
    deviceSupport?: string;
    os?: string;
    cpu?: string;
    gpu?: string;
    ram?: string;
    diskSpace?: string;
  };
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