import { createStore, applyMiddleware, compose } from 'redux';
//applyMiddleware & compose are middleware. It's optional
//compose will turn on the middleware to one obj so that it can be used as one parameter.

import thunk from 'redux-thunk';

import rootReducer from './reducers';

const DEFAULT_STATE = {
    error: { message: null }
}

export const store = createStore(
    rootReducer,
    DEFAULT_STATE,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);