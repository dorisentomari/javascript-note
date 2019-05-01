import * as Types from '../action-types';

const initState = {
  user: null,
  success: null,
  error: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case Types.SET_SESSION:
      return action.payload;
    default:
      return {...state};
  }
}
