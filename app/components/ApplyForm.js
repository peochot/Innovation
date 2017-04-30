import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {apply, toggleApplyForm} from '../actions';
const mapStateToProps = ({applyFormToggler}) => ({applyFormToggler});

const mapDispatchToProps = dispatch => ({
  apply :(body) => dispatch(apply(body)),
  toggleApplyForm :() => dispatch(toggleApplyForm())
});

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) =>

  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
  
class ApplyForm extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit = (value) => {
    console.log('handleSubmit', value);
    // this.props.createLetters(value);
  }

  render() {
    const { handleSubmit } = this.props
    console.log('form rendered', this.props);
    console.log(handleSubmit)

    return (
      <Dialog
        title="Apply job"
        modal={false}
        open={this.props.applyFormToggler}
      >
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h3>Template name</h3>
        <Field component={TextField} name="templateName" />
        <h3>Email body</h3>
        <Field name="content" style={styles.textareaStyle} component="textarea"/>
        <h3>Upload attachment</h3>
          <Field
            component={FileInput}
            name="files"
          />
        <br/>
        <br/>
        <div>
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.props.toggleApplyForm}
          />
          <FlatButton
            label="Submit"
            primary={true}
            type="submit"
            keyboardFocused={true}
          />
        </div>
      </form>
      </Dialog>
    );
  }
}

// export default reduxForm({
//   form: 'ApplyForm',
// }, mapStateToProps, mapDispatchToProps)(ApplyForm);
export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm);
