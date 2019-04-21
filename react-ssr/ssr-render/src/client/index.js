import React from 'react';
import ReactDom from 'react-dom';
import Counter from '../containers/Counter';

ReactDom.hydrate(<Counter/>, window.root);

