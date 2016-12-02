import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';

import { fetchProfile } from './../actions';

const mapStateToProps = ({ auth, profile }) => ({ auth, profile });
const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(fetchProfile())
});

export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.props.getProfile();
    }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(this.props.profile);
    }

    componentWillReceiveProps(newProps) {
        console.log('ProfilePage willreceiprops', newProps);
    }

    onChange($event) {

    }

    onProfileSubmit( values ) {
        console.info('Form',values); 
        // Dispatch something
    }

    render() {
        console.log(this.props.profile);
        const { firstName, lastName } = this.props.profile;
        // console.log(profile);
        return (
            <div>
                <div className="container">
                   PROFILE PAGE HEADER HERE {firstName}- {lastName}
                </div>
                <h3>
                    TODO : Tabbed content
                </h3>
                <div className="container">
                    <h4> Profile Form </h4>
                    <ProfileForm onSubmit={this.onProfileSubmit}></ProfileForm>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);