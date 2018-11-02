import React from 'react';
import 'semantic-ui-css/semantic.min.css';

const Navbar = (props) => {
  return (
    <div className="ui secondary pointing menu" id="Navbar">
      <a className="item active">
        Friends
      </a>
      <a className="item">
        Events
      </a>
      <div className="" id="user-name">
        Welcome Back Jun
      </div>
      <div className="right menu">
        <a className="ui item">
          Logout
        </a>
      </div>
    </div>
  )
};

export default Navbar;
