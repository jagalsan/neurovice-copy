/**
 * Tags related types and interfaces
 */

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  sceneTags: TagScene[];
  pornStarsTags: TagPornStar[];
}

export interface TagScene {
  sceneId: number;
  tagId: number;
  scene: {
    id: number;
    title: string;
    description: string;
    public: boolean;
    createdAt: string;
    updatedAt: string;
    hash: string;
    mainImageUrl: string | null;
    mainVideoUrl: string | null;
    seasonId: number | null;
  };
}

export interface TagPornStar {
  pornStarId: number;
  tagId: number;
  pornStar: {
    id: number;
    name: string;
    surname: string;
    age: string;
    gender: string;
    bio: string;
    userId: number | null;
    createdAt: string;
    updatedAt: string;
  };
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