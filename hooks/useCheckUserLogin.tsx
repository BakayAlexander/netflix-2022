import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../firebase';
import {
  loadingActionCreator,
  loginActionCreator,
  loginErrorActionCreator,
  logoutActionCreator,
} from '../redux/reducer';

export const useCheckIsUserLoggedIn = () => (dispatch: any) => {
  const router = useRouter();
  useEffect(() => {
    // dispatch(loadingActionCreator(true));
    try {
      onAuthStateChanged(auth, user => {
        if (user) {
          // Logged in...
          dispatch(loginActionCreator(user));
        } else {
          // Not logged in...
          dispatch(logoutActionCreator());
          router.push('/login');
        }
      });
    } catch (e) {
      console.log(e);
      dispatch(loginErrorActionCreator(e));
    } finally {
      // dispatch(loadingActionCreator(false));
    }
  }, [auth]);
};
