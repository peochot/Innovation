import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchLetters, toggleTemplateForm } from './../../actions';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import CreateTemplate from '../CreateTemplate';
import ContentSend from 'material-ui/svg-icons/content/send';
import Dialog from 'material-ui/Dialog';

import { blue500, yellow600 } from 'material-ui/styles/colors';

// TODO : NO NO NO
const mapStateToProps = ({ letter  }) => ({ letter });
const mapDispatchToProps = dispatch => ({
    fetchLetters: () => dispatch(fetchLetters),
    toggleTemplateForm: () => dispatch(toggleTemplateForm())
});

class TemplateList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isDialogOpen: false,
            dialogContent: ""
        };
        this.onItemSelected = this.onItemSelected.bind(this);
    }
    
    onItemSelected(e) {
        this.setState({dialogContent: e, isDialogOpen: true})
    }

    componentWillMount() {
        this.props.fetchLetters();
    }
    
    componentWillReceiveProps(newProps) {

    }

    render() {
        const { letter } = this.props;
        console.log('l', this.props.letter);
        return (
            <div>
            <List>
                {letter.map((l)=>{
                    // trim milliseconds
                    l.created = l.created.split(".")[0]
                   return <ListItem
                        key={l._id}
                        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                        rightIcon={<ActionInfo />}
                        primaryText={l.letterName}
                        secondaryText={l.created}
                        onTouchTap={()=>this.onItemSelected(l.content)}
                    />
                })}
                <ListItem primaryText="Create template" leftIcon={<ContentSend />} onTouchTap={this.props.toggleTemplateForm} />
            </List>
              <Dialog
                title="Template content"
                modal={false}
                open={this.state.isDialogOpen}
                onRequestClose={()=>this.setState({isDialogOpen: false})}>
                {this.state.dialogContent}
              </Dialog>
            <CreateTemplate/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);