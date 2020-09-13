import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './data/reducer';
import rootSaga from './data/saga';
import App from './components/App';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

render(
   <Provider store={store}>
     <App />
   </Provider>,
document.getElementById('root'),
);