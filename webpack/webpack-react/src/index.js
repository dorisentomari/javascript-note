import React from 'react';
import {render} from 'react-dom';
import moment from 'moment';
render(<h1>hello, {moment(new Date()).format('YYYY-MM-DD')}</h1>, document.getElementById('root'));
