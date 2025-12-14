/**
 * PornStars related types and interfaces
 */

import { Tag } from "./tags";
import { Scene } from "./scenes";

export interface PornStar {
  id: number;
  name: string;
  surname: string;
  age: string;
  gender: string;
  bio: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  scenePornStars: PornStarScene[];
  pornStarsTags: PornStarTag[];
  profileImage?: string;
  galleryImages?: string[]; // Array de URLs de galería
  ofUrl?: string;
  igUrl?: string;
  xUrl?: string;
}

export interface PornStarScene {
  sceneId: number;
  pornStarId: number;
  scene: {
    id: number;
    title: string;
    createdAt: string;
    public: boolean;
    mainImageUrl?: string;
  };
}

export interface PornStarTag {
  pornStarId: number;
  tagId: number;
  tag: {
    id: number;
    name: string;
  };
}

export interface CreatePornStarRequest {
  name: string;
  surname: string;
  age: string; 
  gender: string;
  bio: string;
  email: string;
  tags?: Tag[];
  scenes?: Scene[];
}

export interface UpdatePornStarRequest {
  name?: string;
  surname?: string;
  referalCode?: string;
  email?: string;
  age?: string; 
  gender?: string;
  bio?: string;
  tags?: Tag[];
  scenes?: Scene[];
}

export interface PornStarListParams {
  limit?: number;
  offset?: number;
  searchText?: string;
}