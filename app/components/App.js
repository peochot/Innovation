import React from 'react';
import Toolbar from './Toolbar';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';


// TODO: Remove this
const App = ({ children }) => {
  return (<div style={{ marginBottom: '0px' }}>
    <header className="container" style={{ marginBottom: '0px', paddingTop: '0px' }}>
      <Toolbar />
    </header>
    {children}
  </div>);
};

class Main extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      snackMsg: '',
      snackOpen: false,
      snackDuration: 3000
    }
  }

  callSnackbar = (message, duration = 5000) => {
    this.setState({
      snackOpen: true,
      snackMsg: message,
      snackDuration: duration
    });
  }

  closeSnackbar = () => {
    this.setState({
      snackOpen: false
    })
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;
    // console.log('AppRender', this.state.snackOpen);
    const { closeSnackbar, callSnackbar } = this;

    return (
      <div style={{ marginBottom: '0px' }}>
        <header className="container" style={{ marginBottom: '0px', paddingTop: '0px' }}>
          <Toolbar />
        </header>
        {React.cloneElement(this.props.children, { callSnackbar: callSnackbar, closeSnackbar: closeSnackbar })}
        <Snackbar onRequestClose={closeSnackbar} message={this.state.snackMsg} open={this.state.snackOpen} autoHideDuration={this.state.snackDuration} />
      </div>);
  }
}

export default connect(null)(Main);
