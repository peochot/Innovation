import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
import JobDescComment from './JobDescComment';
import ApplyForm from '../ApplyForm';

import moment from 'moment';
// Lower-order components

// Redux
import { connect } from 'react-redux';
import { Tab, Tabs } from 'material-ui/Tabs';

// Reducers
import { jobDesc } from './../../reducers';
import { fetchJobDesc, toggleApplyForm } from './../../actions';

// TODO
const mapStateToProps = ({ jobDesc }) => ({ jobDesc });
const mapDispatchToProps = (dispatch) => ({
    getJobDesc: (jobId) => dispatch(fetchJobDesc(jobId)),
    toggleApplyForm: () => dispatch(toggleApplyForm())
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
        jobInfo.comments = [
            {
                user: {
                    firstName: 'test',
                    lastName: 'testtilainen',
                    _id: 123,
                    title: 'Software Developer'
                },
                content: 'I very love working here, nice experience !'
            },
            {
                user: {
                    firstName: 'Indida',
                    lastName: 'testtilainen',
                    _id: 123,
                    title: 'Indian Software Developer'
                },
                content: 'I hate working here, I need more money !'
            }
        ]
        return (
            <div>
                <ApplyForm/>
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
                                    <p>Expire at: {moment(jobInfo.expire).format('ll')}</p>
                                </div>
                            </Tab>
                            <Tab
                                label="Company Info"
                                onActive={handleActive}
                                icon={<FontIcon className="material-icons">business</FontIcon>} >
                                <div>
                                    <p> Address</p>
                                    <p> {jobInfo.address} </p>
                                    <p> Website</p>
                                    <p> {jobInfo.website || "No website found"}</p>
                                    <p> Contact person </p>
                                    <p>{jobInfo.email} </p>
                                </div>
                            </Tab>
                            <Tab
                                label="Comment"
                                onActive={handleActive}
                                icon={<FontIcon className="material-icons">work</FontIcon>} >
                                <div>
                                    {
                                        jobInfo.comments.map(comment => <JobDescComment jobComment={comment} />)
                                    }
                                </div>
                            </Tab>
                        </Tabs>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Apply" onTouchTap={this.props.toggleApplyForm}/>
                        <FlatButton label="Save for later" />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDescContainer);