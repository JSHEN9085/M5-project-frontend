import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Modal} from 'semantic-ui-react';
import {API_ROOT, HEADERS} from '../constants/index'


class Message extends Component {

  handleRecall = (event) => {
    console.log(this.props.message);
    const currentTime = new Date
    if ( (currentTime.getTime() - Date.parse(this.props.message.created_at)) / 1000 > 5 ) {
      alert("can't delete this message");
    } else {
      fetch(`${API_ROOT}/chats/${this.props.message.chat_id}/messages/${this.props.message.id}`, {
        method: "DELETE",
        headers: HEADERS,
        body: JSON.stringify({})
      }).then(() => {
        let chat = {...this.props.chats.activeChat}
        const position = chat.messages.indexOf(this.props.message)
        chat.messages.splice(position, 1)
        this.props.addMessage(chat)
      })
    }
  }

  render () {
    return (
      this.props.message.user_id === this.props.user.user.id ?
        (<div className="message-orange">
          <h4 className="message-content">{this.props.user.user.firstname} said <button className="recall-my-message" onClick={this.handleRecall}>x</button></h4>

           <p className="message-content">{this.props.message.content}</p>
           <div className="message-timestamp-right">{this.props.message.created_at}</div>
         </div>
        ) : (
         <div className="message-blue">
           {this.props.message.user? <h4 className="message-content">{this.props.message.user.firstname} said </h4> : null}
            <p className="message-content">{this.props.message.content}</p>
            <div className="message-timestamp-left">{this.props.message.created_at}</div>
          </div>
        )
    )
  }
};

const mapStateToProps = ({ usersReducer: user, chatsReducer: chats }) => ({ user, chats })

const mapDispatchToProps = dispatch => ({
  addMessage: chat => dispatch({type: "ADD_MESSAGE", chat}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Message);
