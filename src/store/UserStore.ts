import {create} from 'zustand';

export interface User {
  userId: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
}

export interface UserStore extends User {
  isLoggedIn: boolean;

  setIsLoggedIn: (status: boolean) => void;
  setUserId: (userId: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setRoles: (roles: string[]) => void;
  setUser: (user: User) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>(set => ({
  isLoggedIn: false,
  userId: '',
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  roles: [],

  setIsLoggedIn: (status: boolean) => set(() => ({isLoggedIn: status})),
  setUserId: (userId: string) => set(() => ({userId})),
  setEmail: (email: string) => set(() => ({email})),
  setName: (name: string) => set(() => ({name})),
  setAccessToken: (accessToken: string) => set(() => ({accessToken})),
  setRefreshToken: (refreshToken: string) => set(() => ({refreshToken})),
  setRoles: (roles: string[]) => set(() => ({roles})),
  setUser: (user: User) =>
    set(() => ({
      isLoggedIn: true,
      ...user,
    })),
  reset: () =>
    set(() => ({
      isLoggedIn: false,
      userId: '',
      name: '',
      email: '',
      accessToken: '',
      refreshToken: '',
      roles: [],
    })),
}));
