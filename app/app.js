import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import configureStore from './store/configureStore';
import { syncHistoryWithStore} from 'react-router-redux';
import {getCookie} from './utils';
import {loginUserSuccess} from './actions';
import axios from 'axios';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
let state = store.getState();
const routes = getRoutes(store);

function run () {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>), document.getElementById('root'));
}

function init () {
  let token = localStorage.getItem('token')||getCookie("mycookie");
  if (token) {
      const user = JSON.parse(window.atob(token.split('.')[1]));
      const authData={
        token,
        user,
        isAuthenticated: true,
        isAuthenticating: false,
        statusText: null
      }
      store.dispatch(loginUserSuccess(authData));
  }
  run();
  store.subscribe(run);
}

init();
