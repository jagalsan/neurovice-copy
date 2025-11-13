/**
 * PornStars related types and interfaces
 */

import { Tag } from "./tags";
import { Scene } from "./scenes";

export interface PornStar {
  id: number;
  name: string;
  surname: string;
  age: number;
  gender: string;
  bio: string;
  email?: string;
  userId?: number;
  referalCode?: string;
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