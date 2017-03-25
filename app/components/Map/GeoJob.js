import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import JobDrawer from './JobDrawer';
import { connect } from 'react-redux';
import { fetchJobs } from '../../actions';
import DiscussModal from './DiscussModal';
import RefreshButton from './RefreshButton';

const mapStateToProps = ({ auth, geoJob, isDiscussOpen, selectedJob }) => ({ auth, geoJob, isDiscussOpen, selectedJob });

const mapDispatchToProps = dispatch => ({
  fetchJobs: () => dispatch(fetchJobs())
});

export class GeoJob extends Component {
  componentWillMount() {
  }

  componentDidMount() {
    // this.props.fetchJobs();
  }

  render() {
    console.log('GeoJob', this.props.geoJob);
    let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    const divStyle = {
      height: height < 500 ? height : height * 0.85
    };
    let content;
    if (this.props.selectedJob && this.props.isDiscussOpen) {
      content = <DiscussModal />
    } else {
      content =
        <div style={divStyle} >
          <JobDrawer jobs={this.props.geoJob.jobList} />
          <Map
            containerElement={
              <div style={{ height: `100%` }} >
              </div>
            }
            mapElement={
              <div style={{ height: `100%` }} >
              </div>
            }
            //       onMapLoad={()=>{}}
            //       onMapClick={()=>{}}
            jobs={this.props.geoJob.jobList}
          //       onMarkerRightClick={()=>{}}
          />
          <RefreshButton
            onRefreshClick={this.props.fetchJobs.bind(this)}
            isLatest={false}
          />
        </div>
    }
    return (
      content
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeoJob);
