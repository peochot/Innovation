import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import JobList from './JobList';
import { connect } from 'react-redux';
import {fetchJobs} from '../actions';

const mapStateToProps = ({auth,jobs}) => ({auth,jobs});

const mapDispatchToProps = dispatch => ({
  fetchJobs:   ()   => dispatch(fetchJobs())
});

export class GeoJob extends Component {
  componentWillMount(){
    this.props.fetchJobs();
  }
  render() {
    let height=(window.innerHeight > 0) ? window.innerHeight : screen.height;
    const divStyle = {
      height:height*0.85
    };
    return (
      <div style={divStyle} >
        <JobList jobs={this.props.jobs}/>
        <Map
         containerElement={
           <div style={{ height: `100%`}} />
         }
         mapElement={
           <div style={{ height: `100%` }} />
         }
  //       onMapLoad={()=>{}}
  //       onMapClick={()=>{}}
           jobs={this.props.jobs}
  //       onMarkerRightClick={()=>{}}
        />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeoJob);
