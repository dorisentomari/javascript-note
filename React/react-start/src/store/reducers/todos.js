import * as Types from "../action-types";

function todos(state = [], action) {
  switch (action.type) {
    case Types.ADD_TODO:
      return [...state, action.value];
  }
  return state;
}

export default todos;
