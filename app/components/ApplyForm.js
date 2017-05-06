import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {applyWithFile, toggleApplyForm} from '../actions';
import { Field, reduxForm } from 'redux-form'
import {
    TextField
} from 'redux-form-material-ui';

const mapStateToProps = ({applyFormToggler, letter, jobDesc}) => {
  return {
    applyFormToggler: applyFormToggler,
    letter: letter,
    jobDesc: jobDesc,
    initialValues: {
      email: jobDesc.jobInfo.email
    }
  }
};

const mapDispatchToProps = dispatch => ({
  applyWithFile :(jobId, body) => dispatch(applyWithFile(jobId, body)),
  toggleApplyForm :() => dispatch(toggleApplyForm())
});

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const styles = {
  textareaStyle: {
    width: '100%',
    marginBottom: '20px',
    minHeight: '120px'
  }
};

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
    this.state = {
      emailBody: "" // initialValues doesn't work
    }
  }

  handleSubmit = (fileContainer) => {
    var formData = new FormData();
    formData.append('letter', this.state.emailBody);
    formData.append('file', fileContainer.file);
    this.props.applyWithFile(this.props.jobDesc.jobInfo._id, formData);
  }

  handleChange = (e) => {
    console.log('change', e.target.value);
    var emailBody = "";
    for(var i = 0; i<this.props.letter.length; i++){
      if(this.props.letter[i]._id == e.target.value) {
        emailBody = this.props.letter[i].content
      }
    }
    this.setState({emailBody: emailBody});
  }

  handleTextChange = (e) => {
    this.setState({emailBody: e.target.value});
  }

  render() {
    const { handleSubmit, letter} = this.props
    const { jobInfo } = this.props.jobDesc;
    console.log('desc', jobInfo)

    return (
      <Dialog
        title="Apply job"
        modal={false}
        open={this.props.applyFormToggler}
      >
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h3>To</h3>
        <b>{this.props.initialValues.email}</b>
        <br/>
        <br/>
        <select onChange={this.handleChange}>
          <option value="">Select a template...</option>
          {letter.map(l =>
          <option value={l._id} key={l._id}>{l.letterName}</option>)}
        </select>
        <h3>Email body</h3>
        <textarea style={styles.textareaStyle} value={this.state.emailBody} onChange={this.handleTextChange}/>
        <h3>Upload attachment</h3>
          <Field
            component={FileInput}
            name="file"
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
          />
        </div>
      </form>
      </Dialog>
    );
  }
}

ApplyForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplyForm);

export default reduxForm({
  form: 'ApplyForm',
  enableReinitialize: true
})(ApplyForm);

