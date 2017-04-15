import React from 'react';
import { connect } from 'react-redux';
import { go } from 'react-router-redux';
import { Link } from 'react-router';
import { bookmark, apply, openDiscussModal } from '../../actions';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import moment from 'moment';



const mapDispatchToProps = dispatch => ({
  bookmark: (jobId) => dispatch(bookmark(jobId)),
  apply: (jobId) => dispatch(apply(jobId)),
  goTo: (jobId) => {
    console.log('goTo', jobId);
    return dispatch(go('jobdesc/' + jobId))
  },
  openDiscussModal: () => dispatch(openDiscussModal()),

});
export class JobCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullDesc: false
    };
  }

  toggleDescription = () => { this.setState({ fullDesc: !this.state.fullDesc }) }

  handleBookmark = (jobId) => {
    this.props.bookmark(jobId);

    // console.log(this);
    this.props.callSnackbar('Job bookmarked',5000);
  }

  render() {
    const now = new Date().getTime() / 1000;
    const direction = `https://www.reittiopas.fi/reitti/YourLocation::${this.props.userLocation.lat},${this.props.userLocation.lng}/${this.props.job.company}::${this.props.jobLocation.lat},${this.props.jobLocation.lng}?time=${now}&arriveBy=false`
    return (
      <Card>
        <CardHeader
          title={this.props.job.title}
          subtitle={this.props.job.company}
          avatar={`https://robohash.org/${this.props.job.company}`}
        />
        <CardTitle subtitle={"Expire on: " + moment(this.props.job.expire).format('LL')} />
        <CardText>
          {this.state.fullDesc ? this.props.job.description : `${this.props.job.description.substring(0, 100)}...`}
        </CardText>
        <CardActions>
          <Link to={'/jobdesc/' + this.props.job._id}>
            <IconButton tooltip="Go" tooltipPosition="top-right">
              <FontIcon className="material-icons">subject</FontIcon>
            </IconButton>
          </Link>
          {
            <IconButton disabled={this.props.job.bookmarked}
              tooltip={!this.props.job.bookmarked ? "Bookmark" : "Job bookmarked"}
              onTouchTap={this.handleBookmark.bind(this, this.props.job._id)} tooltipPosition="top-right">
              <FontIcon className="material-icons">fingerprint</FontIcon>
            </IconButton>
          }
          <a target="_blank" href={direction} >
            <IconButton tooltip="Location" tooltipPosition="top-right">
              <FontIcon className="material-icons">visibility</FontIcon>
            </IconButton>
          </a>
        </CardActions>
      </Card>
    )
  }
}
export default connect(null, mapDispatchToProps)(JobCard);
