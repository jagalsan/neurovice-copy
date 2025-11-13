/**
 * Axios Client Configuration
 * Centralized HTTP client with interceptors and error handling
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenManager } from "@/lib/utils/token-manager";
import { logError } from "@/lib/utils/api-error-handler";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
  
  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean;
    _retry?: boolean;
  }
}

/**
 * Create configured Axios instance
 */
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.skipAuth) {
        return config;
      }

      const token = tokenManager.getAccessToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      logError(error, "Request Interceptor");
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (originalRequest.skipAuth) {
        logError(error, "Response Interceptor (Public Endpoint)");
        return Promise.reject(error);
      }
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = tokenManager.getRefreshToken();

          if (!refreshToken) {
            tokenManager.clearTokens();
            window.location.href = "/";
            return Promise.reject(error);
          }

          const { data } = await axios.post(
            `${API_BASE_URL}/authentication/refresh`,
            { refreshToken }
          );

          tokenManager.setTokens(data.accessToken, data.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          tokenManager.clearTokens();
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      }

      logError(error, "Response Interceptor");
      return Promise.reject(error);
    }
  );

  return instance;
}

export const apiClient = createAxiosInstance();