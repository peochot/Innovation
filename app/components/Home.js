import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
// import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import './home.css';

class Home extends Component {

  render() {
    const features = [
      { title: 'Easy Sign in', img: './images/one-click.jpg', link: '/#', description: '' },
      { title: 'Company Feedback', img: './images/feedback.jpg', link: '/#', description: '' },
      { title: 'Material Design', img: './images/material-ui.png', link: '/#', description: '' },
      { title: 'Job Map', img: './images/job-map.png', link: '/map', description: '' },
      { title: 'Professional Profile', img: './images/profile.png', link: '/profile', description: '' },
      { title: 'Email Template', img: './images/template.png', link: '/#', description: '' },
    ]

    const myFeatures = features.map((item, index) => {
      return (
        <div key={index.toString()} className="u-flex-item-30 u-flex u-flex-column u-flex-vertical-center">
          <a href={item.link}>
            <img src={item.img}></img>
            <h3>{item.title}</h3>
          </a>
        </div>
      )
    })

    /*const myFeatures = features.map((item, index) => {
      return (
        <div key={index.toString()} className="c-feature-item u-flex u-flex-space-between">
          <img className="c-feature-img" src={item.img}></img>
          <div className="c-feature-description">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>

        </div>
      )
    })*/

    const members = [
      { name: 'Huy Phan', avatar: './images/members/huy.jpg', git: 'https://github.com/peochot', linkedin: 'https://www.linkedin.com/in/huyfin/' },
      { name: 'Tri Nguyen', avatar: './images/members/tri.jpg', git: 'https://github.com/peochot', linkedin: 'https://www.linkedin.com/in/triminh94/' },
      { name: 'Bang Nguyen', avatar: './images/members/bang.jpg', git: 'https://github.com/peochot', linkedin: 'https://www.linkedin.com/in/bangnguyen1992/' },
      { name: 'Minh Cao', avatar: './images/members/minh.jpg', git: 'https://github.com/peochot', linkedin: 'https://www.linkedin.com/in/minh-cao-587a2bb4/' },
      { name: 'Chuong Truong', avatar: './images/members/chuong.jpg', git: 'https://github.com/peochot', linkedin: 'https://www.linkedin.com/in/tpc290893/' },
    ]

    const myMembers = members.map((item, index) => {
      return (
        <div key={index.toString()} className="u-flex-item-30 u-flex u-flex-column u-flex-vertical-center">
          <img className="img-circle" src={item.avatar}></img>
          <h2>{item.name}</h2>
        </div>
      )
    })

    return (
      <div className="v-home">
        {/*Banner*/}
        <div className="c-banner u-flex u-flex-vertical-center">
          <div className="card-view">
            <h1>Welcome to Smart Career</h1>
            <a className="btn" href="/google">Get Started</a>
          </div>
        </div>
        {/*About us*/}
        <div className="c-about-us u-flex u-flex-vertical-center u-flex-horizon-center">
          <h1>Smart Career</h1>
          <p>Smart Career is a group project of students in Helsinki Metropolia. Our goal is to create a novel job market service, which will improve the job market community and provide students and job seekers a convenient tool to share their knowledge, experiences, feedback about the jobs and companies and build their own connection and social network.</p>
        </div>

        {/*Features*/}
        <div className="c-features u-flex u-flex-column u-flex-vertical-center">
          <h1>Main Features</h1>
          <div className="c-feature-container u-flex u-flex-horizon-center">
            {myFeatures}
            {/*<div className="c-feature-item u-flex u-flex-space-between">
              <img className="c-feature-img" src="images/job-map.png"></img>
              <div className="c-feature-description">

              </div>

            </div>*/}

          </div>
        </div>

        {/*Team members*/}
        {/*<div className="c-members u-flex u-flex-column u-flex-vertical-center">
          <h1>Team members</h1>
          <div className="c-members-container u-flex u-flex-nowrap">
            {myMembers}
          </div>
          
        </div>*/}

        {/*Footer*/}
        <div className="c-footer u-flex u-flex-horizon-center u-flex-vertical-center">
        2017 - Smart Career project
        </div>
      </div>
    );
  }
}

export default Home;