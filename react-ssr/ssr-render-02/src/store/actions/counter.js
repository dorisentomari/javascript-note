import * as Types from '../action-types';

export default {
  increment(number) {
    return {type: Types.INCREMENT, number};
  }
}
