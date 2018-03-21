import { createStore, applyMiddleware, compose } from 'redux';

import { reducer } from './reducer';
import freezeState from './freeze-state';

export const devToolsExtension = ((window).__REDUX_DEVTOOLS_EXTENSION__)
    ? (window).__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;

export const store = createStore(reducer, compose(applyMiddleware(freezeState), devToolsExtension));
