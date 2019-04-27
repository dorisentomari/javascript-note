let callbacks = [];

let state = {
  number: 0,
  name: 'Mark'
};

callbacks.push([state => ({number: state.number + 1}), () => {console.log(state)}]);
callbacks.push([state => ({number: state.number + 2}), () => {console.log(state)}]);
callbacks.push([state => ({number: state.number + 3}), () => {console.log(state)}]);

let v;
let fns = [];
while ((v = callbacks.shift())) {
  let [cb, fn] = v;
  Object.assign(state, cb(state));
  fns.push(fn);
}
fns.forEach(fn => fn());
