import { applyMiddleware, createStore } from 'redux';
// import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducer';

// const middleware = applyMiddleware(promise(), thunk, logger);
const middleware = applyMiddleware(promise(), thunk);
const store = createStore(rootReducer, middleware);


export default store; 