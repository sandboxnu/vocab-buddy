import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { configureStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import { reducer, saga } from './pages/index';
import App from './App';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(saga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
