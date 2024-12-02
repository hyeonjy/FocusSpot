import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(persist(set => ({
    isGonnaSignOut: true,
    isAuthenticated: false,
    setIsAuthenticated: (boolean) => set(() => ({ isAuthenticated: boolean })),
    setIsGonnaSignOut: (boolean) => set(() => ({ isGonnaSignOut: boolean }))
})))