import { create } from "zustand";

interface BreadcrumbState {
  customLabels: Record<string, string>;
  setCustomLabel: (segment: string, label: string) => void;
  clearCustomLabels: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  customLabels: {},
  setCustomLabel: (segment, label) =>
    set((state) => ({
      customLabels: { ...state.customLabels, [segment]: label },
    })),
  clearCustomLabels: () => set({ customLabels: {} }),
}));
