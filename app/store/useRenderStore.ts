import { create } from "zustand";

type RenderStore = {
  ssrCacheHit: boolean | null;
  csrCacheHit: boolean | null;
  setSsrCacheHit: (value: boolean) => void;
  setCsrCacheHit: (value: boolean) => void;
};

export const useRenderStore = create<RenderStore>((set) => ({
  ssrCacheHit: null, // null = hasn't rendered yet
  csrCacheHit: null,
  setSsrCacheHit: (value) => set({ ssrCacheHit: value }),
  setCsrCacheHit: (value) => set({ csrCacheHit: value }),
}));
