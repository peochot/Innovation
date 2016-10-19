import React,{Component} from 'react';
import {Marker,InfoWindow } from "react-google-maps";
import { connect } from 'react-redux';
import {selectJob} from '../actions';
import JobCard from './JobCard';

const mapStateToProps = ({selectedJob}) => ({selectedJob});

const mapDispatchToProps = dispatch => ({
  selectJob: (jobId)=>dispatch(selectJob(jobId))
});
export class InfoMarker extends Component {

  render() {
    let marker={
      position: {
        lat: this.props.job.coords[0],
        lng: this.props.job.coords[1],
      },
      key: this.props.job._id,
      defaultAnimation: 2,
    };
    return (
      <Marker
          onClick={() => this.props.selectJob(this.props.job._id)}
          {...marker}
              >
              {this.props.selectedJob.jobId==this.props.job._id && (
                <InfoWindow
                  options={{maxWidth: 400}}
                  onCloseClick={() => this.props.selectJob(null)}>
                  <JobCard job={this.props.job} index={this.props.index}/>
                </InfoWindow>
              )}

        </Marker>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoMarker);
