import * as Types from "../action-types";

function counter(state = {number: 0}, action) {
  switch (action.type) {
    case Types.INCREMENT:
      return {...state, number: state.number + action.count};
  }
  return state;
}

export default counter;
