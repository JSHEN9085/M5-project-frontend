import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react';
import { connect } from 'react-redux'
import {API_ROOT, HEADERS} from '../constants/index'
import '../index.css'
import Flatiron from '../Img/userSmall.jpg'
import Jun from '../Img/Jun.jpg'
import Super from '../Img/Super.jpg'


class Chat extends Component {

  timeShowing = (time) => {
    let date = time.split("T")
    let splitedDate = date[0].split("-")
    return `${splitedDate[0]}/${splitedDate[1]}/${splitedDate[2]}`
  }

  handleSelect = (event) => {
    fetch(`${API_ROOT}/chats/${this.props.chat.id}/`)
    .then(r => r.json())
    .then(chat => {
      if ( !chat.users.find(user => user.id === this.props.user.user.id) ) {
        fetch(`${API_ROOT}/chats/${this.props.chat.id}/subscriptions`, {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify({
            user_id: this.props.user.user.id, //need to change to current user id
            chat_id: this.props.chat.id
          })
        })
      }
    }).then(() => this.props.history.push(`/chats/${this.props.chat.id}`))
  }

  render () {
    return (
      <tr className="chat">
      <td>{this.props.chat.creator.small_picture ? <Image avatar src={this.props.chat.creator.small_picture} /> : <Image avatar src={Flatiron}/>} {this.props.chat.creator.firstname}</td>
      <td>{this.props.chat.topic}</td>
      <td className="updated-time">{this.props.chat.messages.length ? this.timeShowing(this.props.chat.messages.slice(-1)[0].created_at) : this.timeShowing(this.props.chat.created_at) }</td>
      <td className="join-btn">
        <Button onClick={this.handleSelect}>Join</Button>
      </td>
      </tr>
    );
  };
}

const mapStateToProps = ({ usersReducer: user, chatsReducer: chats }) => ({ user, chats })

const mapDispatchToProps = dispatch => ({
  selectChat: chat => dispatch({type: "SELECT_CHAT", chat}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
