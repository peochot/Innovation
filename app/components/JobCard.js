import React from 'react';
import { Link } from 'react-router';

const JobCard = props => (
  <div className="container g-t--12">
    <div style={{width:"70%"}} className="card">
      <h4>{props.job.title}</h4>
      {props.job.description}
    </div>
    <div style={{width:"30%"}} className="card">
      <button className="btn--float">+</button>
      <button className="btn--raised">Share</button>
      <Link  className="btn--raised">Apply</Link>
      <p>
        Expire date : {props.job.expire?props.job.expire:"ASAP"}
      </p>
    </div>
  </div>
);


export default JobCard;
