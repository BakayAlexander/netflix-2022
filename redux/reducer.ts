import { defaultStateTypes } from './../typings.d';
import { combineReducers } from 'redux';
import { actions } from './actions';

let defaultState: defaultStateTypes = {
  isLoading: false,
  loginError: '',
  isLoggedIn: false,
  user: null,
  showModal: false,
  currentMovie: null,
};

const reducer = (state = defaultState, action: { type: any; data: any }) => {
  switch (action.type) {
    case actions.LOADING: {
      return { ...state, isLoading: action.data };
    }
    case actions.LOGIN: {
      return { ...state, isLoggedIn: true, user: action.data };
    }
    case actions.ERROR: {
      return { ...state, loginError: action.data };
    }
    case actions.LOGOUT: {
      return { ...state, isLoggedIn: false, user: null };
    }
    case actions.REGISTER: {
      return { ...state, isLoggedIn: true, user: action.data };
    }
    case actions.SHOW_MODAL: {
      return { ...state, showModal: action.data };
    }
    case actions.CURRENT_MOVIE: {
      return { ...state, currentMovie: action.data };
    }
    default:
      return state;
  }
};

export const loginActionCreator = (data: any) => ({ type: actions.LOGIN, data });

export const loginErrorActionCreator = (data: any) => ({ type: actions.ERROR, data });

export const logoutActionCreator = () => ({ type: actions.LOGOUT });

export const registerActionCreator = (data: any) => ({ type: actions.REGISTER, data });

export const loadingActionCreator = (data: any) => ({ type: actions.LOADING, data });

export const showModalActionCreator = (data: any) => ({ type: actions.SHOW_MODAL, data });

export const currentMovieActionCreator = (data: any) => ({ type: actions.CURRENT_MOVIE, data });

export const rootReducer = combineReducers({
  reducer,
});
