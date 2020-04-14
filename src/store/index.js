import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const initialState = {};

// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ es la para la extension de debugger en Chrome
// Visitar: https://github.com/zalmoxisus/redux-devtools-extension

// composeEnhancers es para el agregado de los middleware
const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
  || compose;

export const store = 
  createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

