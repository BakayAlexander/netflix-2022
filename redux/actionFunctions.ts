import {
  loadingActionCreator,
  loginErrorActionCreator,
  logoutActionCreator,
  loginActionCreator,
  registerActionCreator,
  showModalActionCreator,
  currentMovieActionCreator,
} from './reducer';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebase';

export const signUp = (email: string, password: string) => async (dispatch: any) => {
  dispatch(loadingActionCreator(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(registerActionCreator(userCredential.user));
    return true;
  } catch (e) {
    console.log(e);
    dispatch(loginErrorActionCreator(e));
    dispatch(logoutActionCreator());
    return false;
  } finally {
    dispatch(loadingActionCreator(false));
  }
};

export const signIn = (email: string, password: string) => async (dispatch: any) => {
  dispatch(loadingActionCreator(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginActionCreator(userCredential.user));
    return true;
  } catch (e) {
    console.log(e);
    dispatch(loginErrorActionCreator(e));
    dispatch(logoutActionCreator());
    return false;
  } finally {
    dispatch(loadingActionCreator(false));
  }
};

export const logout = () => async (dispatch: any) => {
  dispatch(loadingActionCreator(true));
  try {
    await signOut(auth);
    dispatch(logoutActionCreator());
    return 'true';
  } catch (e) {
    console.log(e);
    dispatch(loginErrorActionCreator(e));
    return false;
  } finally {
    dispatch(loadingActionCreator(false));
  }
};

export const showModal = (isShown: boolean) => (dispatch: any) => {
  dispatch(showModalActionCreator(isShown));
};

export const selectCurrentMovie = (currentMovie: any) => (dispatch: any) => {
  dispatch(currentMovieActionCreator(currentMovie));
};
