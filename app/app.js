import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getCookie } from './utils';
import { loginUserSuccess, fetchJobs, fetchBookmarks, fetchApplications, fetchLetters } from './actions';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
let state = store.getState();
const routes = getRoutes(store);

function run() {
  ReactDOM.render((
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </MuiThemeProvider>), document.getElementById('root'));
}

function init() {
  injectTapEventPlugin();
  let token = localStorage.getItem('token') || getCookie("mycookie");
  if (token&&!store.getState().auth.isLogout) {
    const user = JSON.parse(window.atob(token.split('.')[1]));
    const authData = {
      token,
      user,
      isAuthenticated: true,
      isAuthenticating: false,
      isLogout: false
    }
    store.dispatch(loginUserSuccess(authData));
    store.dispatch(fetchJobs());
    store.dispatch(fetchBookmarks());
    store.dispatch(fetchApplications());
    store.dispatch(fetchLetters());
  }
  run();
  store.subscribe(run);
}

init();
