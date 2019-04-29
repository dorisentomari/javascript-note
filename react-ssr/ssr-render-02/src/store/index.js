import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';

export const getServerStore = () => createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export const getClientStore = () => {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )
};
