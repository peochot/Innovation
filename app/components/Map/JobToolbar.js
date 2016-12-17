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

export default class JobToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

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
                errorText="error"
                hintText="Keyword"
                fullWidth={true}
                style={{width:"20em"}}
                onChange={()=>console.log("popop")}
                />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label="Search" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
