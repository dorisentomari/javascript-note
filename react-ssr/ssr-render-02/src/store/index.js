import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

import clientAxios from '../client/request';
import serverAxios from '../server/request';

export function getServerStore(req) {
  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(serverAxios(req)), logger))
  );
}

export function getClientStore() {
  const initState = window.context.state;
  return createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(clientAxios), logger))
  );
}
