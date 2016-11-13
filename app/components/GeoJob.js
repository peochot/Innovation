import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import JobList from './JobList';
import { connect } from 'react-redux';
import {fetchJobs} from '../actions';
import DiscussModal from "./DiscussModal";

const mapStateToProps = ({auth,jobs,isDiscussOpen,selectedJob}) => ({auth,jobs,isDiscussOpen,selectedJob});

const mapDispatchToProps = dispatch => ({
  fetchJobs:   ()   => dispatch(fetchJobs())
});

export class GeoJob extends Component {
  componentWillMount(){
    //this.props.fetchJobs();
  }
  render() {
    let height=(window.innerHeight > 0) ? window.innerHeight : screen.height;
    const divStyle = {
      height:height*0.85
    };
    let content;
    if(this.props.selectedJob&&this.props.isDiscussOpen){
      content = <DiscussModal/>
    }else{
      content =<div style={divStyle} >
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
    }
    return (
      content
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeoJob);
