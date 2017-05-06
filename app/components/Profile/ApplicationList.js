import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { fetchApplications } from './../../actions';


// TODO : NOt this map
const mapStateToProps = ({ application }) => ({ application });
const mapDispatchToProps = dispatch => ({
    fetchApplications: () => dispatch(fetchApplications()),
    discardApplication: () => dispatch(discardApplication()),
    sendApplication: () => dispatch(sendApplication())
})

export class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchApplications();
    }

    render() {
        const appList = this.props.application || [];
        return (
            <div>
                {appList.map((app) => {
                    app.job.expire = app.job.expire.split("T")[0]
                   return <Card key={app._id}>
                            <CardHeader
                                title={`${app.job.title} at ${app.job.company}`}
                                subtitle={`Expiry date: ${app.job.expire}`}
                                actAsExpander={true}
                                showExpandableButton={true}
                                titleStyle={{fontWeight: 900}}
                                />
                            <CardText expandable={true}>
                                {app.job.description}
                            </CardText>
                        </Card>
                })}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationList);