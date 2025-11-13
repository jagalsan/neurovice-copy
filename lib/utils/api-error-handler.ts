/**
 * API Error Handler Utility
 * Centralizes error handling and provides user-friendly error messages
 */

import { AxiosError } from "axios";
import { ApiError } from "../api/types";

/**
 * Extract error message from API error response
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError | undefined;
    return apiError?.message || error.message || "An unexpected error occurred";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 400;
  }
  return false;
}

/**
 * Check if error is a not found error
 */
export function isNotFoundError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 404;
  }
  return false;
}

/**
 * Log error to console in development
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === "development") {
    console.error(`[API Error${context ? ` - ${context}` : ""}]:`, error);
  }
}