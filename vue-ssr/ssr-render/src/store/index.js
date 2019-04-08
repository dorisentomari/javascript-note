import Vuex from 'vuex';
import Vue from 'vue';

import mutations from './mutations';
import * as getters from './getters';
import * as actions from './action';
import state from './state';

Vue.use(Vuex);

export default () => {
  const store = new Vuex.Store({
    mutations,
    getters,
    actions,
    state
  });
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store;
}
