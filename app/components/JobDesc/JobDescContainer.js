import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
// Lower-order components

// Redux
import { connect } from 'react-redux';
import { Tab, Tabs } from 'material-ui/Tabs';
// TODO
const mapStateToProps = null;
const mapDispatchToProps = null;

class JobDescContainer extends React.Component {

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {

    }

    componentWillUnmount() {

    }

    handleActive = () => {
        console.log('active', this);
    }

    render() {
        const { handleActive } = this;
        console.log(handleActive());
        return (
            <div>
                <Card>
                    <CardHeader
                        title="JobDesc"
                        subtitle="JobDesc subtitle"
                    />
                    <CardText>
                        <Tabs>
                            <Tab
                                label="Job Description"
                                icon={<FontIcon className="material-icons">work</FontIcon>} >
                                <div>
                                    <h2>Tab One</h2>
                                    <p>This is an example tab.</p>
                                    <p>You can put any sort of HTML or react component in here. It even keeps the component state!
                        </p>
                                    <Slider name="slider0" defaultValue={0.5} />
                                </div>
                            </Tab>
                            <Tab
                                label="Company Info"
                                onActive={handleActive}
                                icon={<FontIcon className="material-icons">business</FontIcon>} >
                                <div>
                                    <h2>Tab Two</h2>
                                    <p>This is another example tab.</p>
                                </div>
                            </Tab>
                        </Tabs>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Action1" />
                        <FlatButton label="Action2" />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDescContainer);