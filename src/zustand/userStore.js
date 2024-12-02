import { create } from "zustand";

export const useUserStore = create(set => ({
    isAuthenticated: false,
    setIsAuthenticated: (boolean) => set(() => ({ isAuthenticated: boolean }))
}))