import React,{Component} from 'react';

export const JobCard = props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={5}
    defaultCenter={{ lat: 60.2055 , lng: 24.6559 }}
    //onClick={this.props.onMapClick}
  >
    {
        props.jobs.map((job) => (
        <InfoMarker job={job} key={job._id}/>
      ))
    }
  </GoogleMap>
);


export default withGoogleMap(Map);
