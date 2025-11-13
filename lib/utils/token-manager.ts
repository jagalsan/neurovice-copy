/**
 * Token Management Utility
 * Handles secure storage and retrieval of authentication tokens
 */

const TOKEN_KEYS = {
  ACCESS_TOKEN: "neurovice_access_token",
  REFRESH_TOKEN: "neurovice_refresh_token",
} as const;

class TokenManager {
  /**
   * Store access token
   */
  setAccessToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
    }
  }

  /**
   * Retrieve access token
   */
  getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    }
    return null;
  }

  /**
   * Store refresh token
   */
  setRefreshToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
    }
  }

  /**
   * Retrieve refresh token
   */
  getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    }
    return null;
  }

  /**
   * Store both tokens
   */
  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  /**
   * Clear all tokens (logout)
   */
  clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Migrate old tokens to new keys and clean up
   */
  migrateOldTokens(): void {
    if (typeof window !== "undefined") {
      const oldAccessToken = localStorage.getItem("accessToken");
      const oldRefreshToken = localStorage.getItem("refreshToken");
      
      if (oldAccessToken && oldRefreshToken) {
        this.setTokens(oldAccessToken, oldRefreshToken);
        
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    }
  }
}

export const tokenManager = new TokenManager();