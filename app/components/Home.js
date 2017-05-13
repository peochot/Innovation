import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './home.css';

class Home extends Component {

  render() {
    // const myStyles = Object.assign({},styles.homeView,styles['homeView:before']);
    return (
      <div className="v-home">
        {/*Banner*/}
        <div className="c-banner">
          <div className="card-view">
            <h1>Welcome to Smart Career</h1>
            <a className="btn" href="/google">Get Started</a>
          </div>
        </div>
        {/*Feature*/}
        <div className="c-feature">

        </div>

        {/*Team members*/}
        <div className="c-members">

        </div>

        {/*Footer*/}
        <div className="c-footer">

        </div>
      </div>
    );
  }
}

export default Home;


// const styles = {
//   homeView: {
//     backgroundImage: 'url(http://www.gannett-cdn.com/-mm-/8a8b967484fa6572d54f0746d324f45b480d5932/c=0-150-3008-1849&r=1280x720&r=x1803&c=3200x1800/local/-/media/2015/03/27/USATODAY/USATODAY/635630625436138172-retirement-jobs.jpg)',
//     backgroundSize: '150%',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'top',
//     webkitAnimation: 'slide 10s ease',
//     animationIterationCount: 'infinite',
//     transform: 'translate3d(0, 0, 0)',
//     height: '100vh'
//   },
//   'homeView:before': {
//     'content': "",
//     position: 'absolute',
//     zIndex: '1',
//     width: '100%',
//     height: '100%',
//     background: 'rgba(89, 120, 193, .7)'
//   },
//   '@-webkit-keyframes slide': {
//     '0%': {
//       'background-position': 'left',
//     },
//     '50%': {
//       'background-position': 'right',
//     },
//     '100%': {
//       'background-position': 'left'
//     }
//   }

// } 