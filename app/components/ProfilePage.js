import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

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
        console.log('ProfilePage', newProps);
    }

    render() {
        const { profile } = this.props;
        return (
            <div className="container">
                {profile.firstName}- {profile.lastName}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);