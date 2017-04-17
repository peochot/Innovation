import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { connect } from 'react-redux';
import { fetchJobs } from '../../actions';

const mapDispatchToProps = dispatch => ({
  getJobs: (keyword) => dispatch(fetchJobs(keyword))
});

export class JobToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  handleChange = (event, index, value) => this.setState({value});
  onKeywordChange = (e) => { this.state.keyword = e.target.value; };
  onEnterdown = (e) => {
    if (e.keyCode == 13) {
      this.props.getJobs(this.state.keyword);
    }
  };

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <RaisedButton
            label="Jobs"
            onTouchTap={this.props.handleDrawer}
          />
          <TextField
                hintText="Keyword"
                fullWidth={true}
                style={{width:"20em"}}
                style = {{width: 500}}
                onKeyDown={this.onEnterdown}
                onChange={this.onKeywordChange}
                />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label="Search" primary={true} onClick={() => this.props.getJobs(this.state.keyword)}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connect(null, mapDispatchToProps)(JobToolbar);
