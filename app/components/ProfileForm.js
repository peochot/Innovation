import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'


class ProfileForm extends Component {
    constructor(props) {
        super(props);
        console.log('ProfileForm', props);
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Field component={TextField} hintText="First Name" name="firstName"  />
                    </div>
                </div>
                <div>
                    <div>
                        <Field component={TextField} hintText="Last Name" name="lastName"  />
                    </div>
                </div>
                <div>
                    <div>
                        <Field component={TextField} hintText="Title" name="title"  />
                    </div>
                </div>
                <div>
                    <div>
                        <Field component={TextField} hintText="Company" name="company"  />
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                </div>
            </form>
        )
    }
}

ProfileForm = reduxForm({
    form: 'profile'
})(ProfileForm);

ProfileForm = connect(
    state => ({
        initialValues: state.auth.user
    }),{}
)(ProfileForm);

export default ProfileForm;