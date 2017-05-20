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
import { apply, fetchJobDesc, toggleApplyForm, addCommentToCompany, fetchJobReview } from './../../actions';

// TODO
const mapStateToProps = ({ companyId, jobDesc }) => ({ companyId, jobDesc });
const mapDispatchToProps = (dispatch) => ({
    getJobDesc: (jobId) => dispatch(fetchJobDesc(jobId)),
    toggleApplyForm: () => dispatch(toggleApplyForm()),
    apply: (jobId) => dispatch(applyAtJobDesc(jobId)),
    getJobReview: (companyId) => dispatch(fetchJobReview(companyId)),
    addComment: (jobId, comment) => dispatch(addCommentToCompany(jobId, comment))
})

const styles = {
    iconStyle: {
        backgroundColor: 'rgb(0, 188, 212)',
        color: '#ffffff',
        width: '1.5em',
        height: '1.5em',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '1.5',
        margin: '10px 15px',
        verticalAlign: 'middle'
    }
};

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
        this.props.getJobReview(this.props.params.companyId);
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
        // console.log("object", jobInfo.description);
        return (
            <div style={{ margin: '1em' }}>
                <ApplyForm />
                <Card>
                    {/*<CardHeader
                        title={jobInfo.title}
                        subtitle={jobInfo.company}
                    />*/}
                    <div style={{ padding: '1em 0 0 1em' }}>
                        <h2>{jobInfo.title}</h2>
                        <h4>From: {jobInfo.company}</h4>
                    </div>
                    <CardText>
                        <Tabs>
                            <Tab
                                label="Job Description"
                                onActive={handleActive}
                                icon={<FontIcon className="material-icons">work</FontIcon>} >

                                <div style={{ whiteSpace: 'pre-line' }}>

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
                                    <p><FontIcon className="material-icons" style={styles.iconStyle}>location_on</FontIcon>{jobInfo.address}</p>
                                    {/*<p> {jobInfo.address} </p>*/}
                                    <p><FontIcon className="material-icons" style={styles.iconStyle}>web</FontIcon>{jobInfo.website || "No website found"}</p>
                                    {/*<p> {jobInfo.website || "No website found"}</p>*/}
                                    <p><FontIcon className="material-icons" style={styles.iconStyle}>email</FontIcon>{jobInfo.email}</p>
                                    {/*<p>{jobInfo.email} </p>*/}
                                </div>
                            </Tab>
                            <Tab
                                label="Comment"
                                onActive={handleActive}
                                icon={<FontIcon className="material-icons">comment</FontIcon>} >
                                <div>
                                    {jobInfo.comments.map(comment => <JobDescComment jobComment={comment} />)}
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
                        <FlatButton label="Apply" onTouchTap={this.props.toggleApplyForm} />
                        <FlatButton label="Save for later" />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDescContainer);