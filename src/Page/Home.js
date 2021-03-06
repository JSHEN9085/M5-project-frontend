import React, { Component } from 'react';
// import BackgroundSlideshow from 'react-background-slideshow';
// import BackgroundSlider from 'react-background-slider';
// import Background1 from '../Img/bg-1.jpg'
// import Background2 from '../Img/bg-2.jpg'
// import Background3 from '../Img/bg-3.jpg'
// import Background0 from '../Img/bg-00.gif'
import { Button } from 'semantic-ui-react'
import { Modal } from 'semantic-ui-react'
import Video from '../Img/typing.mp4'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { loginUser } from '../action/user'
import { connect } from "react-redux";
import { Redirect } from 'react-router';


class Home extends Component {

  handleLoginAsGuest = (event) => {
    this.props.loginUser("guest@flatiron.com", "123")
  }

  render() {
    return this.props.user.loggedIn ?
    (<Redirect to="/mainpage" />)
    :
    (
      <React.Fragment>
        <div className="app-name">
          Flatiron RealTime Forum
        </div>

          <div className="home-login-button">
            <Modal trigger={<button className="massive ui primary button" name="login">
                Log In
              </button>}>
              <Login history={this.props.history}/>
            </Modal>
          </div>

          <div className="home-signup-button">
            <Modal trigger={<button className="massive ui secondary button" name="signup">
                Sign Up
              </button>}>
              <SignUp history={this.props.history}/>
              </Modal>
          </div>

          <div className="home-guest">
            <Button color='green' className="home-guest-btn" onClick={this.handleLoginAsGuest}>
              Log In as Super Guest
            </Button>
          </div>
        <video id="background-video" loop autoPlay>
          <source src={Video} type="video/mp4" />
          <source src={Video} type="video/ogg" />
        </video>

      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default connect(mapStateToProps, {loginUser})(Home);

// <BackgroundSlideshow
//   images={[ Background1, Background2, Background3 ]}
//   animationDelay={4000}/>
// sylvain.david@example.com

// lasse.svingen@example.com
// 123
