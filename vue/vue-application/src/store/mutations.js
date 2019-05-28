import * as TYPES from './mutation-types';

const mutations = {
  [TYPES.SET_LESSON](state, lesson) {
    state.lesson = lesson;
  }
};

export default mutations
