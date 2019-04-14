import * as Types from "../action-types";

export default {
  add(count) {
    return {
      type: Types.INCREMENT,
      count
    }
  }
}
