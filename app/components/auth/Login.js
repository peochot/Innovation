import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Login extends Component {
  render() {
    return (
      <div><h3>Login form</h3>
        <a className='btn--raised' href="/google"> Login google </a>
      </div>

    );
  }
}

export default Login;
