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
      value: 3,
      keyword: ''
    };
  }

  handleChange = (event, index, value) => this.setState({value});
  onKeywordChange = (e) => { this.state.keyword = e.target.value; };
  openAdvanceSearch = () => this.setState({value});

  render() {
    let searchKey=[{key:"title",label:"By Title"},
                  {key:"description",label:"By Description"},
                  {key:"company",label:"By Company"},
                  {key:"region",label:"By Region"},
                  {key:"tag",label:"By Tag"}]
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <RaisedButton
            label="Jobs"
            onTouchTap={this.props.handleDrawer}
          />
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            {
              searchKey.map((obj)=>{
                <MenuItem value={obj.key} primaryText={obj.label} />
            })
            }
          </DropDownMenu>
          <TextField
                hintText="Keyword"
                fullWidth={true}
                style={{width:"20em"}}
                onChange={this.onKeywordChange}
                />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label="Search" primary={true} onClick={() => this.props.getJobs(this.state.keyword)}/>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Advance Search" onClick/>
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connect(null, mapDispatchToProps)(JobToolbar);
