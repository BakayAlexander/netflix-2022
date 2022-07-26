import { defaultStateTypes } from './../typings.d';

type StateType = {
   reducer: defaultStateTypes
}

export const isLoadingSelector = (state: StateType) => state.reducer.isLoading;
export const isLoggedInSelector = (state: StateType) => state.reducer.isLoggedIn;
export const loginErrorSelector = (state: StateType) => state.reducer.loginError;
export const userSelector = (state: StateType) => state.reducer.user
export const showModalSelector = (state: StateType) => state.reducer.showModal
export const currentMovieSelector = (state: StateType) => state.reducer.currentMovie