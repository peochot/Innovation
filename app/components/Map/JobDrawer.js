import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import JobToolbar from './JobToolbar';
import ASDialog from './AdvanceSearchDialog';
import { connect } from 'react-redux';
import {selectJob} from '../../actions';
const mapDispatchToProps = dispatch => ({
  selectJob: (job_id)=>dispatch(selectJob(job_id))
});
export class JobDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});
  render() {
    return (
      <div>
        <JobToolbar handleDrawer={this.handleToggle}/>
        <ASDialog/>
        <Drawer
        docked={false}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
        containerStyle={{'position': 'absolute', 'top': '80px'}}>
          {
            this.props.jobs.map((job) => (
            <MenuItem key={job._id} onClick={()=>{this.props.selectJob(job._id);this.handleClose()}}>{job.title}</MenuItem>
          ))
          }
        </Drawer>
      </div>
    );
  }
}
export default connect(null,mapDispatchToProps)(JobDrawer);
