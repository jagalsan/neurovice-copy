import { redirect } from "next/navigation";

/**
 * Error handling utilities for consistent error management across pages
 */

export type ErrorAction = "redirect" | "throw" | "log";

interface ErrorHandlerOptions {
  action?: ErrorAction;
  redirectTo?: string;
  logPrefix?: string;
}

const defaultOptions: ErrorHandlerOptions = {
  action: "redirect",
  redirectTo: "/en",
  logPrefix: "Error:",
};

/**
 * Handle errors consistently across server components
 * Default behavior: redirect to home page
 */
export function handlePageError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): never {
  const opts = { ...defaultOptions, ...options };

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error(opts.logPrefix, error);
  }

  switch (opts.action) {
    case "throw":
      throw error;
    case "log":
      // Just log, but still need to redirect for server components
      redirect(opts.redirectTo!);
    case "redirect":
    default:
      redirect(opts.redirectTo!);
  }
}

/**
 * Validate numeric ID from URL slug
 * Returns the number if valid, or redirects to home if invalid
 */
export function validateNumericId(
  slug: string,
  redirectTo: string = "/en"
): number {
  const id = Number(slug);

  if (isNaN(id) || id <= 0) {
    redirect(redirectTo);
  }

  return id;
}

/**
 * Wrapper for async data fetching with error handling
 */
export async function fetchWithErrorHandling<T>(
  fetcher: () => Promise<T>,
  options: ErrorHandlerOptions = {}
): Promise<T> {
  try {
    return await fetcher();
  } catch (error) {
    handlePageError(error, options);
  }
}

/**
 * Create a locale-aware redirect path
 */
export function getLocalizedRedirectPath(locale: string = "en"): string {
  return `/${locale}`;
}
