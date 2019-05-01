import * as HomeActionTypes from './actionTypes';

const defaultStatus = {
  number: 0,
  name: 'mark',
  list: [],
};

export default (state = defaultStatus, action) => {
  switch (action.type) {
    case HomeActionTypes.INCREMENT:
      return {
        ...state,
        number: state.number + 1
      };
    case HomeActionTypes.GET_USERS_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
