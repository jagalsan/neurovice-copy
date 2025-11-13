/**
 * UI Store
 * Zustand store for managing UI state (modals, sidebars, etc.)
 */

"use client";
import { create } from "zustand";

interface UIState {
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAuthModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  isGlobalLoading: false,
  setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
}));
