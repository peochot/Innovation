import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './../actions';
import { browserHistory } from 'react-router'

function handleTouchTap() {
  browserHistory.push('/')
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};
const mapStateToProps = ({auth}) => ({auth});
const mapDispatchToProps = dispatch => ({
  logout: ()=>dispatch(logout())
});

const Toolbar = (props) => {
  let AccountManagement;
  if(props.auth.isAuthenticated){
    AccountManagement =
                <div id="userManagement" style={{display: 'flex', alignItems: 'center'}}>
                    <FlatButton
                      containerElement={<Link to="/" />}
                      label='Home'/>
                    <FlatButton
                      containerElement={<Link to="/map" />}
                      label='Job Map'/>
                    <FlatButton style={{color:'#FFFFFF'}} label={props.auth.user.firstName}
                                secondary={true}
                                icon={<Avatar size={30}>{props.auth.user.firstName}</Avatar>}
                                containerElement={<Link to="/profile"/> } />
                    <FlatButton style={{color:'#FFFFFF'}} onTouchTap={()=>props.logout()} label='Sign out'/>
                </div>;
  } else {
    AccountManagement =
                <div id="userManagement" style={{display: 'flex', alignItems: 'center'}}>
                    <FlatButton style={{color:'#FFFFFF'}} href="/google" label='Sign in'/>
                </div>;
  }

  return (
    <AppBar
      title={<span style={styles.title}>Smart Career</span>}
      onTitleTouchTap={handleTouchTap}
      iconClassNameRight="muidocs-icon-navigation-expand-more">
      {AccountManagement}
      </AppBar>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(Toolbar);
