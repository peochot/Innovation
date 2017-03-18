import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

export class ASDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  handleOpen = () => this.setState({open: true});
  handleClose = () => this.setState({open: false});
  render() {

    return (
      <div>
        
      </div>
    );
  }
}
export default connect(null,null)(ASDialog);
