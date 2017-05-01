import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {createLetters, toggleTemplateForm} from '../actions';
import { Field, reduxForm } from 'redux-form'
import {
    TextField
} from 'redux-form-material-ui';

const mapStateToProps = ({templateFormToggler}) => ({templateFormToggler});

const mapDispatchToProps = dispatch => ({
  createLetters :(body) => dispatch(createLetters(body)),
  toggleTemplateForm :() => dispatch(toggleTemplateForm())
});

const styles = {
  textareaStyle: {
    width: '100%',
    marginBottom: '20px',
    minHeight: '120px'
  }
};

class CreateTemplate extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit = (value) => {
    console.log('handleSubmit', value);
    this.props.createLetters(value);
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Dialog
        title="Create template"
        modal={false}
        open={this.props.templateFormToggler}
      >
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h3>Template name</h3>
        <Field component={TextField} name="templateName" />
        <h3>Email body</h3>
        <Field name="content" style={styles.textareaStyle} component="textarea"/>
        <div>
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.props.toggleTemplateForm}
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

CreateTemplate = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateTemplate);

export default reduxForm({
  form: 'CreateTemplate',
})(CreateTemplate);
