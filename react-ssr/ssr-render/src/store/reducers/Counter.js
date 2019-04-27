import * as Types from '../action-types';

const initState = {
  number: 78
};

export default (state = initState, action) => {
  switch (action.type) {
    case Types.INCREMENT:
      return {...state, number: action.number};
    default:
      return {...state};
  }
}
