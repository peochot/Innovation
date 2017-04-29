import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class JobDescComment extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { jobComment } = this.props;
        return (
            <div>
                <Divider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                    // rightIconButton={rightIconMenu}
                    primaryText={`${jobComment.user.firstName} ${jobComment.user.lastName}`}
                    secondaryText={
                        <p>
                            <span>{jobComment.user.title}</span><br />
                            {jobComment.content}
                        </p>
                    }
                    secondaryTextLines={2}
                />
            </div>
        )

    }
}