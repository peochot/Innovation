import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchLetters } from './../../actions';

import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

import { blue500, yellow600 } from 'material-ui/styles/colors';

// TODO : NO NO NO
const mapStateToProps = ({ letter  }) => ({ letter });
const mapDispatchToProps = dispatch => ({
    fetchLetters: () => dispatch(fetchLetters)
});



class TemplateList extends React.Component {

    onItemSelected(e) {
        console.log(e);
    }

    componentWillMount() {
        this.props.fetchLetters();
    }

    componentWillReceiveProps( newProps ) {

    }

    render() {
        const { letter } = this.props;
        return (
            <List>
                <ListItem
                    leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                    rightIcon={<ActionInfo />}
                    primaryText="C# Developer"
                    secondaryText="Jan 20, 2014"
                    onTouchTap={this.onItemSelected.bind(this)}
                    />
                <ListItem
                    leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600} />}
                    rightIcon={<ActionInfo />}
                    primaryText="Javascript Developer"
                    secondaryText="Jan 10, 2014"
                    onTouchTap={this.onItemSelected.bind(this)}
                    />
            </List>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);