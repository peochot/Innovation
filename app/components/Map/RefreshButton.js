import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Update from 'material-ui/svg-icons/action/update';

const btnStyle = {
    position: 'absolute',
    top: '150px',
    right: '20px'
}

export default class RefreshButton extends Component {
    static propTypes = {
        onRefreshClick: React.PropTypes.func,
        isLatest: React.PropTypes.bool
    }

    constructor(props) {
        super(props)
    }

    render() {

        const { onRefreshClick } = this.props;
        return (
            <div>
                <FloatingActionButton zDepth={2} style={btnStyle} onTouchTap={onRefreshClick}>
                    <Update />
                </FloatingActionButton>
            </div>
        )
    }


}

