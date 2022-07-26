import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../redux/reducer';
export const store = configureStore({ reducer: rootReducer, middleware: [thunkMiddleware] });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
