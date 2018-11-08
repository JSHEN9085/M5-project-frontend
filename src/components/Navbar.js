import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth'
import {fetchCurrentUser} from '../action/user'
import {API_ROOT, HEADERS} from '../constants/index'

class Navbar extends Component {

  componentDidMount() {
   if (localStorage.getItem('jwt')&&!this.props.user.loggedIn) {
     this.props.fetchCurrentUser()
   }
 }

  handleLogout = (event) => {
    this.props.logout()
    localStorage.clear()
  }

  handleUnsubscribe = (event) => {
    if (this.props.chats.activeChat) {
      const chatId = this.props.chats.activeChat.id
      fetch(`http://localhost:3000/chats/${chatId}/subscriptions/delete`, {
        method: "DELETE",
        headers: HEADERS,
        body: JSON.stringify({
          chat_id: this.props.chats.activeChat.id,
          user_id: this.props.user.user.id
        })
      })
    }
  }


  render () {
    return (
        <div className="ui secondary pointing menu" id="Navbar">
          <a href="http://localhost:3001/mainpage" className="item active" onClick={this.handleUnsubscribe}>
            Home
          </a>
          <a className="item active">
            Friendship
          </a>
          <div className="item right active user">
            Welcome Back
          </div>
          <div className="right menu" >
            <a href="http://localhost:3001" className="ui item" onClick={this.handleLogout}>
              Logout
            </a>
          </div>
        </div>
    )
  }
};

const mapStateToProps = ({ usersReducer: user, chatsReducer: chats }) => ({ user, chats })

const logout = () => ({type: 'LOG_OUT'})

export default connect(mapStateToProps, {logout, fetchCurrentUser})(Navbar);
