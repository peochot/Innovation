import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

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
                    <label>First Name</label>
                    <div>
                        <Field name="firstName" component="input" type="text"  />
                    </div>
                </div>
                <div>
                    <label> Last Name</label>
                    <div>
                        <Field name="lastName" component="input" type="text"  />
                    </div>
                </div>
                <div>
                    <label> Title</label>
                    <div>
                        <Field name="title" component="input" type="text"  />
                    </div>
                </div>
                <div>
                    <label> Company</label>
                    <div>
                        <Field name="company" component="input" type="text"  />
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
        initialValues: state.user
    })
)(ProfileForm);

export default ProfileForm;