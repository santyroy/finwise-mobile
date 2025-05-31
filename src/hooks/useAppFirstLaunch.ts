import {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {keys} from 'constants/MMKV';

const storage = new MMKV();

const useAppFirstLaunch = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const checkLaunch = () => {
      const hasLaunched = storage.getBoolean(keys.HAS_APP_FIRST_LAUNCHED_KEY);
      if (hasLaunched) {
        setIsAppFirstLaunched(false);
        console.log('App already launched');
      } else {
        storage.set(keys.HAS_APP_FIRST_LAUNCHED_KEY, true);
        setIsAppFirstLaunched(true);
        console.log('App launched first time');
      }
    };

    checkLaunch();
  }, []);

  return {isAppFirstLaunched};
};

export default useAppFirstLaunch;
