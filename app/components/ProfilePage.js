import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import ProfileForm from './ProfileForm';
import ApplicationList from './ApplicationList';
import TemplateList from './TemplateList';

import { fetchProfile, setProfile } from './../actions';

const mapStateToProps = ({ auth, profile }) => ({ auth, profile });
const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(fetchProfile()),
    setProfile: (data) => dispatch(setProfile(data))
});

export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue : 'basic'
        }
    }

    componentWillMount() {
        this.props.getProfile();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    onChange($event) {

    }

    onTabChange( value ) {
        this.setState({
            tabValue: value,
        })
    }

    onProfileSubmit( values ) {
        console.info('Form',values); 
        // Dispatch something
        this.props.setProfile(values);

    }

    render() {
        const { tabValue } =  this.state ;
        const { firstName, lastName, applications, templates } = this.props.profile;
        // console.log(profile);
        return (
            <div>
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.onTabChange.bind(this)}>
                    <Tab
                        icon={<FontIcon className="material-icons">phone</FontIcon>}
                        label="Basic Information"
                        value="basic">
                        <ProfileForm onSubmit={this.onProfileSubmit.bind(this)}></ProfileForm>
                    </Tab>
                    <Tab
                        icon={<FontIcon className="material-icons">favorite</FontIcon>}
                        label="Pending Application"
                        value="application">

                        <ApplicationList appList={applications} />
                    </Tab>
                    <Tab
                        icon={<FontIcon className="material-icons">favorite</FontIcon>}
                        label="CV Templates"
                        value="templates">
                        
                        <TemplateList templateList={templates} />
                     </Tab>
                </Tabs>   
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);