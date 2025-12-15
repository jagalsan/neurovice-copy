import { AxiosError } from "axios";

/**
 * Check if an error is a server error (5xx status codes)
 * These errors indicate the backend is unavailable or having issues
 */
export function isServerError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? error.status;
    return status !== undefined && status >= 500 && status < 600;
  }
  
  if (error && typeof error === "object" && "status" in error) {
    const status = (error as { status: number }).status;
    return status >= 500 && status < 600;
  }
  
  return false;
}

/**
 * Get the maintenance page path for a given locale
 */
export function getMaintenancePath(locale: string = "en"): string {
  return `/${locale}/maintenance`;
}
