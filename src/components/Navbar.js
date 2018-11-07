import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';

class Navbar extends Component {
  render () {
    return (
      <div className="ui secondary pointing menu" id="Navbar">
        <a href="http://localhost:3001/mainpage" className="item active">
          Home
        </a>
        <a className="item active">
          Friendship
        </a>
        <div className="item right active user">
          Welcome Back
        </div>
        <div className="right menu" >
          <a href="http://localhost:3001" className="ui item">
            Logout
          </a>
        </div>
      </div>
    )
  }
};

export default Navbar;
