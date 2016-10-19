import { withGoogleMap,GoogleMap,Marker,InfoWindow } from "react-google-maps";
import React,{Component} from 'react';
import InfoMarker from './InfoMarker';

export const Map = props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={5}
    defaultCenter={{ lat: 60.2055 , lng: 24.6559 }}
    //onClick={this.props.onMapClick}
  >
    {
        props.jobs.map((job,index) => (
        <InfoMarker job={job} index={index} key={job._id}/>
      ))
    }
  </GoogleMap>
);


export default withGoogleMap(Map);
