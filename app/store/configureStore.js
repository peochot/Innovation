import * as redux from 'redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux';
import * as reducers from '../reducers';
import { reducer as formReducer } from 'redux-form'
/*
export default (history,initialState = {}) => {
  reducers.routing = routerReducer;
  let store = redux.createStore(redux.combineReducers(reducers), initialState, redux.compose(
    redux.applyMiddleware(thunk,routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
*/

export default (initialState = {}) => {
  reducers.routing = routerReducer;
  reducers.form=formReducer;
  let store = redux.createStore(redux.combineReducers(reducers), initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
