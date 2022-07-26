import { loadingActionCreator, loginErrorActionCreator, logoutActionCreator, loginActionCreator, registerActionCreator } from './reducer';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { auth } from '../firebase';


export const signUp = ( email: string, password: string)=> async (dispatch) => {
dispatch(loadingActionCreator(true))
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(registerActionCreator(userCredential.user))
    return true
  } catch (e) {
    console.log(e);
    dispatch(loginErrorActionCreator(e))
    dispatch(logoutActionCreator())
    return false
  } finally {
    dispatch(loadingActionCreator(false))
  }
};

export const signIn =  (email: string, password: string)=> async (dispatch) => {
  dispatch(loadingActionCreator(true))
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginActionCreator(userCredential.user))
    return true
  } catch (e) {
    console.log(e);
    dispatch(loginErrorActionCreator(e))
    dispatch(logoutActionCreator())
    return false
  } finally {
    dispatch(loadingActionCreator(false))
  }
};

export const logout =  () => async (dispatch) => {
  dispatch(loadingActionCreator(true))
  try {
    await signOut(auth);
    dispatch(logoutActionCreator())
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(loadingActionCreator(false))
  }
};

export const checkIsUserLoggedIn = () => async (dispatch) =>{
  dispatch(loadingActionCreator(true))
  try {
      onAuthStateChanged(auth, user => {
      if (user) {
        // Logged in...
        dispatch(loginActionCreator(user))
        dispatch(loadingActionCreator(false))
      } else {
        // Not logged in...
        dispatch(logoutActionCreator())
        dispatch(loadingActionCreator(true))
      }
    })
  }catch (e){
    console.log(e)
  }finally{
    dispatch(loadingActionCreator(false))
  }
}