import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

import clientAxios from '../client/request';
import serverAxios from '../server/request';

export const getServerStore = (req) => createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(serverAxios(req)), logger))
);

export const getClientStore = () => {
  let initState = window.context.state;
  return createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(clientAxios), logger))
  )
};
