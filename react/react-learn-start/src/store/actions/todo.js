import * as Types from "../action-types";

export default {
  addTodo (value) {
    return {
      type: Types.ADD_TODO,
      value
    }
  }
}
