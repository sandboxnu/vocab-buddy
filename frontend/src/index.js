import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { createRoot } from 'react-dom/client';
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import { reducer, saga } from './pages/index';
import App from './App';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(sagaMiddleware)
      .concat(logger);
  },
});

sagaMiddleware.run(saga);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App tab="login" />
  </Provider>
);
