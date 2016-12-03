import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { fetchApplications } from './../actions';


const mapStateToProps = ({ auth,profile }) => ({ auth,profile});
const mapDispatchToProps = dispatch => ({
    fetchApplications: () => dispatch(fetchApplications())
})

export class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchApplications();
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    onApplicationDiscard( appId ) {

    }

    onApplicationSend( appId ) {

    }

    render() {
        const applications = [

        ];

        return(
            <div>
            </div>
        )
    }
}