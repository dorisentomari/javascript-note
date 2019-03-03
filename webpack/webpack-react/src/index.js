import React from 'react';
import {render} from 'react-dom';
import moment from 'moment';
render(<h1>hello, {moment(new Date()).format('YYYY-MM-DD')}</h1>, document.getElementById('root'));



if (__development__) {
  console.log('hello, development');
} else {
  console.log('bye, production');
}

