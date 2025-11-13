import { User } from "./user.interface";

export interface AuthResponse {
    user: User,
    accessToken: string,
    refreshToken: string
}

export interface TokenRefreshResponse {
    accessToken: string,
    refreshToken: string
}
    