/**
 * Users related types and interfaces
 */

export interface BoughtScene {
  id: number;
  title: string;
  mainImageUrl?: string;
  sceneId: number;
}

export interface UserSubscription {
  id: number;
  planId: number;
  status: string;
  startDate: string;
  endDate: string;
  plan?: {
    name: string;
    externalPlan?: {
      origin: string;
    };
  };
}

export interface MyUserResponse {
  id: number;
  email: string;
  name: string;
  lastName: string;
  language: string;
  referalCode: string;
  UserData: any | null;
  UserProfile: any | null;
  boughtScenes: BoughtScene[];
  subscriptions: UserSubscription[];
  facebookId?: string | null;
  googleId?: string | null;
  createdAt?: string;
  secretContent?: boolean;
  updatedAt?: string;
}

export interface UpdateUserDataRequest {
  name: string;
  lastName: string;
  country?: string;
  city?: string;
  address1?: string;
  address2?: string;
  zip?: string;
  avatar?: string;
}

export interface UpdateUserPhoneRequest {
  phoneExt: string;
  phoneNumber: string;
}

export interface UpdateUserLanguageRequest {
  language: string;
}
