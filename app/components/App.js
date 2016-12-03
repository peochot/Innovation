import React from 'react';
import Toolbar from './Toolbar';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const App = ({ children }) => {
  return (<div style={{marginBottom:'0px'}}>
      <header className="container" style={{marginBottom:'0px',paddingTop:'0px'}}>
        <Toolbar/>
      </header>
      {children}
  </div>);
};

export default connect(null)(App);
