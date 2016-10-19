import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {selectJob} from '../actions';
const mapDispatchToProps = dispatch => ({
  selectJob: (jobId,index)=>dispatch(selectJob(jobId,index))
});
const JobList = props => (
  <div>
  <input type="checkbox" id="nav--super-vertical-responsive"/>
  <label className="m--1" htmlFor="nav--super-vertical-responsive">JobList</label>
  <nav className="nav--super-vertical g--2"/>
  <aside className="nav--super-vertical g--2 g-med--3 g-small--6 g-tiny--12 no-margin-vertical">
    <nav className="g--12">
      {
        props.jobs.map((job,index) => (
        <a key={job._id} onClick={()=>props.selectJob(job._id,index)}>{job.title}</a>
      ))
      }
    </nav>
  </aside>
  </div>
);


export default connect(null,mapDispatchToProps)(JobList);
/*
<aside className="nav--super-vertical g--2 g-med--3 g-small--6 g-tiny--12 no-margin-vertical">
  <div className="g--12 logo-area no-margin-vertical">
    Your logo here
  </div>
  <nav className="g--12">
    <a href="">About</a>
    <div className="nav-collapsible">
      <input type="checkbox" id="nav-collapsible-1"/>
      <label htmlFor="nav-collapsible-1">Components</label>
      <div className="nav-collapsible-links">
        <a href="../docs/alerts.html">Alerts</a>
        <a href="../docs/animations.html">Animations</a>
        <a href="../docs/buttons.html">Buttons</a>
      </div>
    </div>
    <a href="">Contact</a>
  </nav>
</aside>
*/
