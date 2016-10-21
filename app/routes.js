import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {push} from 'react-router-redux'
import App from './components/App';
import GeoJob from './components/GeoJob';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Application from './components/Application';
export default function({dispatch,getState}){
  function onEnter(nextState, replace) {
    if (!getState().auth.isAuthenticated) {
      //dispatch(push('/login'));
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      })
      }
    }
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='map(/:jobId)' component={GeoJob} onEnter={onEnter}/>
      <Route path='job/:jobId/apply' component={Application} onEnter={onEnter}/>
      <Route path='*' component={NotFound} />e
    </Route>
  );
}
