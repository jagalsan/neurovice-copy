/**
 * Shared types used across components
 */

// PornStar type for UI components (simplified version for display)
export interface PornStarDisplay {
  name: string;
  slug: string;
  image: string;
  bio?: string;
  tags?: string[];
}

// Cart item type
export interface CartItemType {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  oldPrice?: number | null;
  imageSrc: string;
  quantity?: number;
}

// Platform types
export type Platform = 'META' | 'WINDOWS' | 'APK' | 'META QUEST' | 'WINDOWS PCVR' | 'ANDROID';

// Locale type
export type SupportedLocale = 'en' | 'es';
