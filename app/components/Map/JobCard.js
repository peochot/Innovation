import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bookmark, apply, openDiscussModal } from '../../actions';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';


const mapDispatchToProps = dispatch => ({
  bookmark: (jobId) => dispatch(bookmark(jobId)),
  apply: (jobId) => dispatch(apply(jobId)),
  openDiscussModal: () => dispatch(openDiscussModal())
});
export class JobCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fullDesc: false};
  }
  toggleDescription = () =>{ this.setState({fullDesc:!this.state.fullDesc})}
  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.job.title}
          subtitle={this.props.job.company}
          avatar={`https://robohash.org/${this.props.job.company}`}
        />

        <CardTitle title="Description" subtitle={"Expire on: " + this.props.job.expire} />
        <CardText>
          {this.state.fullDesc ? this.props.job.description : `${this.props.job.description.substring(0, 100)}...`}
          <RaisedButton label="Toggle" onClick={this.toggleDescription}> </RaisedButton>
        </CardText>
        <CardActions>
          {
            this.props.job.bookmarked ? <div>Bookmarked</div> :
              <FloatingActionButton onClick={() => this.props.bookmark(this.this.props.job._id)} label="Ac"></FloatingActionButton>
          }
          <FlatButton label="Direction" href={`https://www.reittiopas.fi/reitti/YourLocation::${this.props.userLocation.lat},${this.props.userLocation.lng}/${this.props.job.company}::${this.props.jobLocation.lat},${this.props.jobLocation.lng}?time=1489846005&arriveBy=false`} />

        </CardActions>
      </Card>)
  }
}
export default connect(null, mapDispatchToProps)(JobCard);

