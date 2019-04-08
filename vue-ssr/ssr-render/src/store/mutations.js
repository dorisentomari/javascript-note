import * as TYPES from './mutation-types';

const mutations = {
  [TYPES.SET_LESSON](state) {
    state.lesson = '新的 lesson 名字';
  }
};

export default mutations;
