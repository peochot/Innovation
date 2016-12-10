import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

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

    componentWillMount() {
        // TODO : LOAD
    }

    componentWillReceiveProps() {

    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Field fullWidth="true" component={TextField} floatingLabelText="First Name" hintText="First Name" name="firstName" />
                    </div>
                </div>
                <div>
                    <div>
                        <Field fullWidth="true" component={TextField} floatingLabelText="Last Name" hintText="Last Name" name="lastName" />
                    </div>
                </div>
                <div>
                    <div>
                        <Field fullWidth="true" component={TextField} floatingLabelText="Title" hintText="Title" name="title" />
                    </div>
                </div>
                <div>
                    <div>
                        <Field fullWidth="true" component={TextField} floatingLabelText="Company" hintText="Company" name="company" />
                    </div>
                </div>
                <div>
                    <RaisedButton primary={true} type="submit" label="Submit" fullWidth={true} disabled={ pristine || submitting } />
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
    }), {}
)(ProfileForm);

export default ProfileForm;