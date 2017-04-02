import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
// Lower-order components


// Redux
import { connect } from 'react-redux';
import { Tab, Tabs } from 'material-ui/Tabs';
// TODO
const mapStateToProps = null;
const mapDispatchToProps = null;

export default class JobDescContainer extends React.Component {


    handleActive(tab) {
    alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
    }

    render() {
        return(
        <div>
            <Card>
                <CardHeader
                    title="JobDesc"
                    subtitle="JobDesc subtitle"
                    avatar=""
                />
                <CardText>
                    <Tabs>
                        <Tab label="Item One" >
                        <div>
                            <h2>Tab One</h2>
                            <p>
                            This is an example tab.
                            </p>
                            <p>
                            You can put any sort of HTML or react component in here. It even keeps the component state!
                            </p>
                            <Slider name="slider0" defaultValue={0.5} />
                        </div>
                        </Tab>
                        <Tab label="Item Two" >
                        <div>
                            <h2>Tab Two</h2>
                            <p>
                            This is another example tab.
                            </p>
                        </div>
                        </Tab>
                        <Tab
                        label="onActive"
                        data-route="/home"
                        onActive={handleActive}
                        >
                        <div>
                            <h2>Tab Three</h2>
                            <p>
                            This is a third example tab.
                            </p>
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
    )}
}