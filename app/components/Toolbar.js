import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './../actions';

// import as ToolbarStyle from './Toolbar.css';

const mapStateToProps = ({auth}) => ({auth});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout)
});

// TODO : dispatch(logout);
const Toolbar = (props) => {
  let Menu;
  if(props.auth.isAuthenticated){
    Menu=  <nav className="g--3 m--3 nav--horizontal">
            <ul>
              <li className="dropdown"><a>Welcome {props.auth.user.firstName}</a>
                <ul>
                  <li><a href="http://www.google.com">Logout</a></li>
                </ul>
              </li>
              <li><Link to="/"> Home </Link></li>
              <li><Link to="/map"> Map </Link></li>
            </ul>
          </nav>
  } else {
    Menu=
      <nav className="g--3 m--3 nav--horizontal">
        <li><a href="/google"> Login using Google </a></li>
      </nav>
  }
  return (<div className="container--baseline">
            <h2 className="m--1 g--8" style={{marginTop:0,marginBottom:0}}>Smart Career</h2>
            <input type="checkbox" id="nav--horizontal-responsive"/>
            <label htmlFor="nav--horizontal-responsive">MENU</label>
            <nav className="nav--horizontal g--4"/>
            {Menu}
          </div>);
};

export default connect(mapStateToProps,mapDispatchToProps)(Toolbar);
