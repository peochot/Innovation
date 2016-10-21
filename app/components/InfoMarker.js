import React,{Component} from 'react';
import {Marker,InfoWindow } from "react-google-maps";
import { connect } from 'react-redux';
import {selectJob} from '../actions';
import JobCard from './JobCard';

const mapStateToProps = ({selectedJob}) => ({selectedJob});

const mapDispatchToProps = dispatch => ({
  selectJob: (jobId)=>dispatch(selectJob(jobId))
});
export const InfoMarker = props => {
    let marker={
      position: {
        lat: props.job.coords[0],
        lng: props.job.coords[1],
      },
      key: props.job._id,
      defaultAnimation: 2,
    };
    return (
      <Marker
          onClick={() => props.selectJob(props.job._id)}
          {...marker}
              >
              {props.selectedJob==props.job._id && (
                <InfoWindow
                  options={{maxWidth: 400}}
                  onCloseClick={() => props.selectJob(null)}>
                  <JobCard job={props.job} index={props.index}/>
                </InfoWindow>
              )}

        </Marker>
    );

}
export default connect(mapStateToProps, mapDispatchToProps)(InfoMarker);
