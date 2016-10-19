import React from 'react';
import { showAddDeck, filterCards } from '../actions';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  showAddDeck: () => dispatch(showAddDeck()),
  onFilter: query => dispatch(filterCards(query))
});

const Toolbar = ({ deckId, showAddDeck, onFilter }) => {

  return (<div className="container--baseline">
  <span className="m--1 g--4">Navigation</span>
  <input type="checkbox" id="nav--horizontal-responsive"/>
  <label htmlFor="nav--horizontal-responsive">MENU</label>
  <nav className="nav--horizontal g--4"/>
  <nav className="g--3 m--3 nav--horizontal">
    <ul>
      <li><Link to="/"> Home </Link></li>
      <li><Link to="/map"> Map </Link></li>
      <li><Link to="/"> Login </Link></li>
      <li className="dropdown"><a href="http://www.g.com">Dropdown</a>
        <ul>
          <li><a href="http://www.google.com">D Link</a></li>
          <li><a href="http://www.google.com">D Link</a></li>
          <li><a href="http://www.google.com">D Link</a></li>
          <li><a href="http://www.google.com">D Link</a></li>
        </ul>
      </li>
      <li><a href="http://www.google.com">Portfolio</a></li>
    </ul>
  </nav>
</div>);
};

export default connect(null, mapDispatchToProps)(Toolbar);
