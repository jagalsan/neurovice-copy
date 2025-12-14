/**
 * Global constants used across the application
 */

// Placeholder images
export const PLACEHOLDER_IMAGE = "/mock/example_1_x.png";
export const PLACEHOLDER_VIDEO = "/mock/video.mp4";
export const PLACEHOLDER_STAR = "/mock/example_1_x.png";
export const PLACEHOLDER_SCENE = "/mock/video-placeholder.jpg";

// Brand colors
export const BRAND_COLORS = {
  cyan: "#17FBF8",
  cyanLight: "#A6FFFF",
  cyanMuted: "#7FF7F5",
  pink: "#761A4E",
  pinkLight: "#C86A9F",
  background: "#171614",
  surface: "#111118",
} as const;

// Grid colors for backgrounds
export const GRID_COLOR = "rgba(23,251,248,0.25)";
export const GRID_COLOR_PINK = "rgba(255,0,150,0.15)";

// Platforms
export const PLATFORMS = {
  all: ["META", "WINDOWS", "APK"] as const,
  display: ["META QUEST 3/3S", "WINDOWS PCVR", "PICO 4 ULTRA", "HTC VIVE", "VALVE INDEX"] as const,
};

// Pagination
export const DEFAULT_PAGE_SIZE = 12;

// API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Locales
export const SUPPORTED_LOCALES = ["en", "es"] as const;
export const DEFAULT_LOCALE = "en";
