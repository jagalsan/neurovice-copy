/**
 * Users related types and interfaces
 */

export interface MyUserResponse {
  id: number;
  email: string;
  name: string;
  referralCode: string;
  facebookId: string | null;
  googleId: string | null;
  createdAt: string;
  secretContent: boolean;
  updatedAt: string;
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
