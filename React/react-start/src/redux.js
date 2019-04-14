function createStore(reducer) {
  let state;

  let listeners = [];

  let getState = () => state;

  let dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(fn => fn());
  };

  dispatch({type: '@INIT'});

  let subscribe = fn => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    }
  };

  return {
    getState,
    dispatch,
    subscribe
  }

}

export {createStore};
