import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm, reset, change as changeFieldValue } from 'redux-form';
import {apply, toggleApplyForm} from '../actions';
const mapStateToProps = ({applyFormToggler}) => ({applyFormToggler});

const mapDispatchToProps = dispatch => ({
  apply :(body) => dispatch(apply(body)),
  toggleApplyForm :() => dispatch(toggleApplyForm())
});

class ApplyForm extends React.Component {
  render() {
    console.log('form rendered', this.props);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.toggleApplyForm}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.apply}
      />,
    ];
    return (
      <Dialog
        title="Apply job"
        actions={actions}
        modal={false}
        open={this.props.applyFormToggler}
      >
      form
      </Dialog>
    );
  }
}

// export default reduxForm({
//   form: 'ApplyForm',
// }, mapStateToProps, mapDispatchToProps)(ApplyForm);
export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm);
