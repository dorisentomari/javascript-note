import Vuex from 'vuex';
import Vue from 'vue';

import mutations from './mutations';
import * as getters from './getters';
import action from './action';
import state from './state';

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations,
  getters,
  action,
  state
});

export default store;




