import { create } from 'zustand';
import { storage } from '@data/mmkv';
import { keys } from '@constants/MMKV';

export interface User {
  userId: string;
  name: string;
  email: string;
  image: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
}

export interface UserStore extends User {
  isLoggedIn: boolean;
  hasHydrated: boolean;

  setIsLoggedIn: (status: boolean) => void;
  setHasHydrated: (status: boolean) => void;
  setUserId: (userId: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setImage: (email: string) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setRoles: (roles: string[]) => void;
  setUser: (user: User) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>(set => ({
  isLoggedIn: false,
  hasHydrated: false,
  userId: '',
  name: '',
  email: '',
  image: '',
  accessToken: '',
  refreshToken: '',
  roles: [],

  setIsLoggedIn: (status: boolean) => set(() => ({ isLoggedIn: status })),
  setHasHydrated: (status: boolean) => set(() => ({ hasHydrated: status })),
  setUserId: (userId: string) => set(() => ({ userId })),
  setEmail: (email: string) => set(() => ({ email })),
  setImage: (image: string) => set(() => ({ image })),
  setName: (name: string) => set(() => ({ name })),
  setAccessToken: (accessToken: string) => set(() => ({ accessToken })),
  setRefreshToken: (refreshToken: string) => set(() => ({ refreshToken })),
  setRoles: (roles: string[]) => set(() => ({ roles })),
  setUser: (user: User) => {
    // store user data in MMKV
    storage.set(keys.USER_DETAILS, JSON.stringify(user));
    set(() => ({
      isLoggedIn: true,
      ...user,
    }));
  },
  reset: () => {
    // remove user data from MMKV
    storage.delete(keys.USER_DETAILS);
    set(() => ({
      isLoggedIn: false,
      userId: '',
      name: '',
      email: '',
      accessToken: '',
      refreshToken: '',
      roles: [],
    }));
  },
}));
