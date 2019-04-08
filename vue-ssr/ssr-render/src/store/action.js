import * as types from './mutation-types'

export const SET_LESSON = function ({commit}, lesson) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit(types.SET_LESSON);
      resolve();
    }, 1000);
  })
};
