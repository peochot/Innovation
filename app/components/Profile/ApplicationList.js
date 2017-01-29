import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { fetchApplications } from './../../actions';


// TODO : NOt this map
const mapStateToProps = ({ auth, profile }) => ({ auth, profile });
const mapDispatchToProps = dispatch => ({
    fetchApplications: () => dispatch(fetchApplications()),
    discardApplication: () => dispatch(discardApplication()),
    sendApplication: () => dispatch(sendApplication())
})

export class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // TODO : LOAD here
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        console.log('ApplicationList newProps', newProps);
        this.props.fetchApplications();
    }

    onApplicationDiscard(appId) {
        console.log('application discard', appId);
        this.props.discardApplication(appId);
    }

    onApplicationSend(appId) {
        console.log('application send', appId);
        this.props.sendApplication(appId);
    }

    onDiscardClick(e) {

    }

    render() {
        // const { appList } = this.props;
        // const appList = this.props.appList;
        const appList = this.props.appList;
        return (
            <div>
                {appList.map((app) => {
                    let applyButton;
                    if (app.status === 'Pending') applyButton = <FlatButton onTouchTap={this.onApplicationSend.bind(this, app.id)} label="Something" primary={true} />;
                    else applyButton = null;
                    return (
                        <Card key={app.id}>
                            <CardHeader
                                title={`${app.jobReference.position} at ${app.jobReference.companyName}`}
                                subtitle={app.status}
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardActions>
                                <FlatButton onTouchTap={this.onApplicationDiscard.bind(this, app.id)} label="Discard" secondary={true} />
                                {applyButton}
                            </CardActions>
                            <CardText expandable={true}>
                                {app.jobReference.shortDescription}
                            </CardText>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationList);