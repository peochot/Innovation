import React,{Component} from 'react';
import {Marker,InfoWindow } from "react-google-maps";
import { connect } from 'react-redux';
import {selectJob} from '../actions';
import JobCard from './JobCard';

const mapStateToProps = ({selectedJob}) => ({selectedJob});

const mapDispatchToProps = dispatch => ({
  selectJob: (job_id)=>dispatch(selectJob(job_id))
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
              {this.props.selectedJob==this.props.job._id && (
                <InfoWindow
                  options={{maxWidth: 400}}
                  onCloseClick={() => this.props.selectJob(null)}>
                  <JobCard job={this.props.job}/>
                </InfoWindow>
              )}

        </Marker>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoMarker);
