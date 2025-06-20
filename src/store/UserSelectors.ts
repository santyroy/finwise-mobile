import { UserStore } from './UserStore';

export const selectUserIsLoggedIn = (state: UserStore) => state.isLoggedIn;
export const selectHasHydrated = (state: UserStore) => state.hasHydrated;
export const selectUserId = (state: UserStore) => state.userId;
export const selectUserName = (state: UserStore) => state.name;
export const selectUserEmail = (state: UserStore) => state.email;
export const selectUserImage = (state: UserStore) => state.image;
export const selectUserAccessToken = (state: UserStore) => state.accessToken;
export const selectUserRefreshToken = (state: UserStore) => state.refreshToken;
export const selectUserRoles = (state: UserStore) => state.roles;
