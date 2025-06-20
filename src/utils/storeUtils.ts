import { storage } from '@data/mmkv';
import { keys } from '@constants/MMKV';
import { useUserStore } from '@store/UserStore';

export const hydrateUserStore = () => {
  try {
    const storedUser = storage.getString(keys.USER_DETAILS);
    if (storedUser) {
      const userDetails = JSON.parse(storedUser);
      useUserStore.getState().setUser(userDetails);
    }
  } catch (error) {
    console.error(error);
  } finally {
    useUserStore.getState().setHasHydrated(true);
  }
};
