import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
import JobDescComment from './JobDescComment';
import ApplyForm from '../ApplyForm';
import TextField from 'material-ui/TextField';

import moment from 'moment';
// Lower-order components

// Redux
import { connect } from 'react-redux';
import { Tab, Tabs } from 'material-ui/Tabs';

// Reducers
import { jobDesc } from './../../reducers';
import { apply, fetchJobDesc, toggleApplyForm, addCommentToCompany } from './../../actions';

// TODO
const mapStateToProps = ({ jobDesc }) => ({ jobDesc });
const mapDispatchToProps = (dispatch) => ({
    getJobDesc: (jobId) => dispatch(fetchJobDesc(jobId)),
    toggleApplyForm: () => dispatch(toggleApplyForm()),
    apply: (jobId) => dispatch(applyAtJobDesc(jobId)),
    addComment: (jobId, comment) => dispatch(addCommentToCompany(jobId, comment))
})

class JobDescContainer extends React.Component {

    constructor(props) {
        super(props);
        // console.log('JobDescCOntainer jobId', props.params.jobId);
        this.state = {
            commentInput: ''
        }
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

    handleApply(jobId) {
        // console.log('Apply job id', jobId);
        this.props.apply(jobId)
    }

    onCommentChange = ($ev) => {
        let value = $ev.target.value;
        console.log('onCommentChange', value);
        this.setState({
            commentInput: value
        })
    }

    addComment(companyId) {
        let comment = this.state.commentInput;
        console.log('add comment to company id', companyId, comment);

        this.props.addComment(companyId, comment);

        this.setState({
            commentInput: ''
        })
    }

    handleActive(tab) {
        console.log('active tab ', tab);
    }

    render() {
        const { handleActive, handleApply } = this;
        const { jobInfo } = this.props.jobDesc;
        // TODO : Comments get , Add Comment
        jobInfo.comments = [
            {
                _id: 'afsdfsfsdaf',
                user: {
                    firstName: 'test',
                    lastName: 'testtilainen',
                    _id: 123,
                    title: 'Software Developer'
                },
                content: 'I very love working here, nice experience !'
            },
            {
                _id: 'asdfadfasdf',
                user: {
                    firstName: 'Indida',
                    lastName: 'testtilainen',
                    _id: 123,
                    title: 'Indian Software Developer'
                },
                content: 'I hate working here, I need more money !'
            }
        ]
        // console.log(jobInfo);
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
                                    <p>Address<FontIcon className="material-icons">location</FontIcon></p>
                                    <p> {jobInfo.address} </p>
                                    <p> Website<FontIcon className="material-icons">link</FontIcon></p>
                                    <p> {jobInfo.website || "No website found"}</p>
                                    <p> Contact person <FontIcon className="material-icons">message</FontIcon></p>
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
                                    <TextField
                                        value={this.state.commentInput}
                                        onChange={this.onCommentChange}
                                        fullWidth={true}
                                        hintText="Type in our comment here"
                                    />
                                    <FlatButton label="Add Comment" onTouchTap={() => this.addComment(jobInfo.cid)} fullWidth={true} />
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