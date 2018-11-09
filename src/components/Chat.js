import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react';
import { connect } from 'react-redux'
// import { NavLink } from "react-router-dom"; user NavLink if going to a specfic address without params
import {API_ROOT, HEADERS} from '../constants/index'
import '../index.css'
import Flatiron from '../Img/userSmall.jpg'


class Chat extends Component {

  handleSelect = (event) => {
    fetch(`${API_ROOT}/chats/${this.props.chat.id}/subscriptions`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        user_id: this.props.user.user.id, //need to change to current user id
        chat_id: this.props.chat.id
      })
    }).then(() => this.props.history.push(`/chats/${this.props.chat.id}`))
  }

  render () {
    return (
      <tr className="chat">
      <td>{this.props.chat.creator.small_picture ? <Image avatar src={this.props.chat.creator.small_picture} /> : <Image avatar src={Flatiron}/>} {this.props.chat.creator.firstname}</td>
      <td>{this.props.chat.topic}</td>
      <td>{this.props.chat.messages.length ? this.props.chat.messages.slice(-1)[0].created_at : this.props.chat.created_at}</td>
      <td className="join-btn">
        <Button onClick={this.handleSelect}>Join</Button>
      </td>
      </tr>
    );
  };
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default connect(mapStateToProps)(Chat);
