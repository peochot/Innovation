import React from 'react';
import Toolbar from './Toolbar';
import { connect } from 'react-redux';
const mapStateToProps = (props, { params: { deckId } }) => ({
  deckId
});

const App = ({ deckId, children }) => {
  return (<div style={{marginBottom:'0px'}}>
      <header className="container" style={{marginBottom:'0px',paddingTop:'0px'}}>
        <Toolbar deckId={deckId} />
      </header>
      {children}
  </div>);
};

export default connect(mapStateToProps)(App);
