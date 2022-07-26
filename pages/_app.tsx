import '../styles/globals.css';
import type { AppProps } from 'next/app';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { loadingActionCreator, loginActionCreator, logoutActionCreator, rootReducer } from '../redux/reducer';
const store = configureStore({ reducer: rootReducer, middleware: [thunkMiddleware] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
