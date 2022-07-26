import { RootState } from './store';

export const isLoadingSelector = (state: RootState) => state.reducer.isLoading;
export const isLoggedInSelector = (state: RootState) => state.reducer.isLoggedIn;
export const loginErrorSelector = (state: RootState) => state.reducer.loginError;
export const userSelector = (state: RootState) => state.reducer.user
export const showModalSelector = (state: RootState) => state.reducer.showModal
export const currentMovieSelector = (state: RootState) => state.reducer.currentMovie