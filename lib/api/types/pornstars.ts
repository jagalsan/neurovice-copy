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
  userId: number | null;
  createdAt: string;
  updatedAt: string;
  scenePornStars: PornStarScene[];
  pornStarsTags: PornStarTag[];
  
  // TODO: CAMPOS FALTANTES - Agregar al backend:
  height?: string;        // Ejemplo: "5.11\"" o "175 cm"
  breast?: string;        // Ejemplo: "36DD"
  weight?: string;        // Ejemplo: "123 lbs" o "56 kg"
  hairColor?: string;     // Ejemplo: "Blue", "Blonde", etc.
  ethnicity?: string;     // Ejemplo: "White", "Latina", etc.
  quote?: string;         // Frase/cita de la estrella
  profileImage?: string;  // URL de la imagen principal
  galleryImages?: string[]; // Array de URLs de galería
  socialMedia?: {         // Redes sociales
    onlyfans?: string;
    instagram?: string;
    x?: string;
  };
}

export interface PornStarScene {
  sceneId: number;
  pornStarId: number;
  scene: {
    id: number;
    title: string;
    createdAt: string;
    public: boolean;
    // TODO: CAMPOS FALTANTES - Agregar al backend:
    thumbnailUrl?: string;  // URL de la miniatura de la escena
    coverImage?: string;    // URL de la imagen de portada
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