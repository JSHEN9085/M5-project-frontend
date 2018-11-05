import React, { Component } from 'react';
// import BackgroundSlideshow from 'react-background-slideshow';
// import BackgroundSlider from 'react-background-slider';
// import Background1 from '../Img/bg-1.jpg'
// import Background2 from '../Img/bg-2.jpg'
// import Background3 from '../Img/bg-3.jpg'
// import Background0 from '../Img/bg-00.gif'
// import { Card, Image, Button } from 'semantic-ui-react'
import Video from '../Img/typing.mp4'
import { NavLink } from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div className="home-page">
        <center className="app-name">
          Flatiron RealTime Forum
          <div className="home-button">
            <NavLink to="/login" >
              <button className="massive ui primary button">
                Log In
              </button>
            </NavLink>
            <NavLink to="/signup" >
              <button className="massive ui secondary button">
                Sign Up
              </button>
            </NavLink>
            </div>
        </center>
        <video id="background-video" loop autoPlay>
          <source src={Video} type="video/mp4" />
          <source src={Video} type="video/ogg" />
        </video>

      </div>
    );
  }
}

export default Home;




// <BackgroundSlideshow
//   images={[ Background1, Background2, Background3 ]}
//   animationDelay={4000}/>
