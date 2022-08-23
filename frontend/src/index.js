import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware).concat(logger),
});

sagaMiddleware.run(saga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
