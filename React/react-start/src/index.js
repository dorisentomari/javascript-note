import React from 'react';
import {render} from 'react-dom';
import Counter from './components/Counter';
import Todo from "./components/Todo";
import {Provider} from 'react-redux';
import store from './store';

render(<Provider store={store}><Counter/><Todo/></Provider>, window.root);

