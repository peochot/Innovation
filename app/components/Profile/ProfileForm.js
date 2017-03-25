import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Multiselect from 'react-widgets/lib/Multiselect';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-widgets/dist/css/react-widgets.css';

// require('react-widgets/dist/css/react-widgets.css');

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
} from 'redux-form-material-ui';


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

    handleSubmit(value) {
        console.log('handleSubmit', value);
        this.props.onSubmit()
    }

    render() {
        const { pristine, submitting, dataSource } = this.props;
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <Field fullWidth={true} component={TextField} floatingLabelText="First Name" hintText="First Name" name="firstName" />
                    <Field fullWidth={true} component={TextField} floatingLabelText="Last Name" hintText="Last Name" name="lastName" />
                    <Field fullWidth={true} component={TextField} floatingLabelText="Title" hintText="Title" name="title" />
                    <Field fullWidth={true} component={TextField} floatingLabelText="Company" hintText="Company" name="company" />
                    <label> TODO: Label styling </label>
                    <Field hintText="Preference" floatingLabelText="Preference" component={renderMultiselect}
                        floatingLabelText="Preference" name="preferences"
                        data={dataSource} />
                </div>
                <div>
                    <RaisedButton primary={true} type="submit" label="Submit"  disabled={pristine || submitting} />
                </div>
            </form>
        )
    }
}

const renderMultiselect = ({ input, ...rest }) =>
    <Multiselect {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []} // requires value to be an array
        {...rest} />

ProfileForm = reduxForm({
    form: 'profile'
})(ProfileForm);

ProfileForm = connect(
    state => ({
        dataSource: state.tags,
        initialValues: state.profile,
        enableReinitialize: true
    }), {}
)(ProfileForm);

export default ProfileForm;