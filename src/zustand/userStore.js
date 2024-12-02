import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(persist(set => ({
    isGonnaSignOut: true,
    isAuthenticated: false,
    setIsAuthenticated: (boolean) => set(() => ({ isAuthenticated: boolean })),
    setIsGonnaSignOut: (boolean) => set(() => ({ isGonnaSignOut: boolean }))
}), {
    name: "userAuth",
}
))

/*
create(
  persist(
    {
      name: "todos-storage", // 저장소 이름을 설정해요!
      // getStorage: () => sessionStorage, // localStorage가 아닌 곳에 저정하고 싶다면!
    }
  )
);

*/