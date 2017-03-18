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
        <Dialog
          title="Advanced Job Search"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        {
          this.props.searchKey.map((obj)=>{

          });
        }
        </Dialog>
      </div>
    );
  }
}
export default connect(null,null)(ASDialog);
