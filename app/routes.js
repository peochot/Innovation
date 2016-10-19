import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {push} from 'react-router-redux'
import App from './components/App';
import GeoJob from './components/GeoJob';
import Login from './components/auth/Login';
import NotFound from './components/NotFound';
import Home from './components/Home';

export default function({dispatch,getState}){
  function onEnter(nextState, replace) {
    if (!getState().auth.isAuthenticated) {
      //dispatch(push('/login'));
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
      }
    }
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='login' component={Login} />
      <Route path='map' component={GeoJob} onEnter={onEnter}/>
      <Route path='*' component={NotFound} />e
    </Route>
  );
}
