import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
// Lower-order components

// Redux
import { connect } from 'react-redux';
import { Tab, Tabs } from 'material-ui/Tabs';

// Reducers
import { jobDesc } from './../../reducers';
import { fetchJobDesc } from './../../actions';

// TODO
const mapStateToProps = ({ jobDesc }) => ({ jobDesc });
const mapDispatchToProps = (dispatch) => ({
    getJobDesc: (jobId) => dispatch(fetchJobDesc(jobId))
})

class JobDescContainer extends React.Component {

    constructor(props) {
        super(props);
        console.log('JobDescCOntainer jobId', props.params.jobId);
    }
    componentWillMount() {
        // this.props.getJobDesc()
        this.props.getJobDesc(this.props.params.jobId);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {

    }

    componentWillUnmount() {

    }

    handleActive = (tab) => {
        console.log('active tab ', tab);
    }

    render() {
        const { handleActive } = this;
        const { jobInfo } = this.props.jobDesc;

        console.log(jobInfo);
        return (
            <div>
                <Card>
                    <CardHeader
                        title={jobInfo.title}
                        subtitle={jobInfo.company}
                    />
                    <CardText>
                        <Tabs>
                            <Tab
                                label="Job Description"
                                onActive={handleActive}
                                icon={<FontIcon className="material-icons">work</FontIcon>} >
                                <div>
                                    <p>
                                        {jobInfo.description}
                                    </p>
                                    <p>Expire at: {jobInfo.expire}</p>
                                </div>
                            </Tab>
                            <Tab
                                label="Company Info"
                                onActive={handleActive}
                                icon={<FontIcon className="material-icons">business</FontIcon>} >
                                <div>
                                    <p> Address : {jobInfo.address} </p>
                                    <p> Website : {jobInfo.website}</p>
                                    <p> Contact person: {jobInfo.email} </p>
                                </div>
                            </Tab>
                        </Tabs>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Apply" />
                        <FlatButton label="Save for later" />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDescContainer);