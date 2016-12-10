import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bookmark,apply,openDiscussModal} from '../../actions';

const mapDispatchToProps = dispatch => ({
  bookmark: (jobId)=>dispatch(bookmark(jobId)),
  apply: (jobId)=>dispatch(apply(jobId)),
  openDiscussModal:()=>dispatch(openDiscussModal())
});
export const JobCard = props => (
  <div className="container g-t--12">
    <div style={{width:"70%"}} className="card">
      <h4>{props.job.title}</h4>
      {props.job.description}
    </div>
    <div style={{width:"30%"}} className="card">
      {
          props.job.bookmarked?
          <div>Bookmarked</div>:
          <div><button className="btn--float" onClick={()=>props.bookmark(props.job._id)}>+</button></div>
      }
      <button className="btn--raised">Share</button>
      <button className="btn--raised" onClick={()=>props.openDiscussModal()}>Discuss</button>

      <Link className="btn--raised" to={`/job/${props.job._id}/apply`}>Apply</Link>
      <p>
        Expire date : {props.job.expire?props.job.expire:"ASAP"}
      </p>
    </div>
  </div>
);


export default connect(null,mapDispatchToProps)(JobCard);
