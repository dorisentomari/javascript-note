import React from 'react';
import ReactDOM from 'react-dom';
// import MouseTracker from './MouseTracker';
// import Picture from './Picture';
// <MouseTracker render={(props) => <Picture {...props} />} />

import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(<>
  <ErrorBoundary/>
</>, window.root);
