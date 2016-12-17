import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import React, { Component } from 'react';
import InfoMarker from './InfoMarker';

let defaultLat = 60.2055;
let defaultLon = 24.6559;

// Get Current Position ( However , must be accepted by users , or use the default )
navigator.geolocation.getCurrentPosition(function (location) {
  defaultLat = location.coords.latitude;
  defaultLon = location.coords.longitude;
});

export const Map = props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: defaultLat, lng: defaultLon  }}
    //onClick={this.props.onMapClick}
    >
    {
      props.jobs.map((job) => (
        <InfoMarker job={job} key={job._id} />
      ))
    }
  </GoogleMap>
);
export default withGoogleMap(Map);
