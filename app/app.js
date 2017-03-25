import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';

// State management
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

//  Material theming
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Reducers
import {
  loginUserSuccess, fetchJobs,
  fetchBookmarks, fetchApplications, fetchLetters, fetchTags
} from './actions';

// Misc
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getCookie } from './utils';


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
  if (token && !store.getState().auth.isLogout) {
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
    store.dispatch(fetchTags());
  }
  run();
  store.subscribe(run);
}

init();
