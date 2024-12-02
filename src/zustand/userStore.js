import { create } from "zustand";

export const useUserStore = create(set => ({
    isGonnaSignIn: true,
    isAuthenticated: false,
    setIsAuthenticated: (boolean) => set(() => ({ isAuthenticated: boolean })),
    setIsGonnaSignIn: (boolean) => set(() => ({ isGonnaSignIn: boolean }))
}))