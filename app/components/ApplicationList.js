import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { fetchApplications } from './../actions';


const mapStateToProps = ({ auth,profile }) => ({ auth,profile });
const mapDispatchToProps = dispatch => ({
    fetchApplications: () => dispatch(fetchApplications())
})

export class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
        // props : appList <array>
        this.state = {
            mock : [
                        {
            id: 1,
            jobReference: {
                companyName: 'Papa Oy',
                position: 'Senior Machine Learner',
                shortDescription: 'Senior momo'
            },
            status: 'Pending'
        },
        {
            id: 2,
            jobReference: {
                companyName: 'Papa Oy 2',
                position: 'Senior Machine SLeeper',
                shortDescription: 'Senior momofafa'
            },
            status: 'Pending'
        }
            ]
        }
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    componentWillReceiveProps( newProps ) {
        console.log(' newProps',newProps);
        // this.props.fetchApplications(newProps.appList);
        
    }

    onApplicationDiscard( appId ) {

    }

    onApplicationSend( appId ) {

    }

    render() {
        // const { appList } = this.props;
        // const appList = this.props.appList;
        const appList = this.state.mock;
        return(
            <div>
                {appList.map( (app) => (
                    <Card key={app.id}>
                        <CardHeader
                        title={app.jobReference.position}
                        subtitle={app.jobReference.companyName}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                        <CardActions>
                            <FlatButton label="Discard" />
                            <FlatButton label="Something" />
                        </CardActions>
                    <CardText expandable={true}>
                        {app.jobReference.shortDescription}
                    </CardText>
                </Card>
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ApplicationList);