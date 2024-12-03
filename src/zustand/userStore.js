import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(persist(set => ({
  id: null,
  name: null,
  email: null,
  profileImg: null,
  isAuthenticated: false,
  isSigningUp: false,
  setId: (userId) => set(() => ({ id: userId })),
  setName: (userName) => set(() => ({ name: userName })),
  setEmail: (userEmail) => set(() => ({ email: userEmail })),
  setProfileImg: (userProfileImg) => set(() => ({ profileImg: userProfileImg })),
  setIsAuthenticated: (boolean) => set(() => ({ isAuthenticated: boolean })),
  setIsSigningUp: (boolean) => set(() => ({ isSigningUp: boolean })),
}), {
  name: "userAuth",
}
))