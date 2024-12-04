import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { googleSignOut } from '../api/googleAuth';

export const useUserStore = create(
  persist(
    (set) => ({
      id: null,
      name: null,
      email: null,
      profileImg: null,
      isAuthenticated: false,
      setId: (userId) => set(() => ({ id: userId })),
      setName: (userName) => set(() => ({ name: userName })),
      setEmail: (userEmail) => set(() => ({ email: userEmail })),
      setProfileImg: (userProfileImg) => set(() => ({ profileImg: userProfileImg })),
      setIsAuthenticated: (boolean) => set(() => ({ isAuthenticated: boolean })),
      handleSignOut: async () => {
        try {
          await googleSignOut();

          set(() => ({
            id: null,
            name: null,
            email: null,
            profileImg: null,
            isAuthenticated: false
          }));
        } catch (error) {
          console.error('Sign out failed:', error);
        }
      }
    }),
    {
      name: 'userAuth',
      getStorage: () => localStorage
    }
  )
);
