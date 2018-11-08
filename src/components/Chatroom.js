import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants';
import Message from './Message'
import NewMessageForm from './NewMessageForm'
import Joiners from './Joiners'
import Navbar from './Navbar'
import { connect } from 'react-redux'

class Chatroom extends Component {

  componentDidMount () {
    console.log(this.props.match.params.id)
    fetch(`${API_ROOT}/chats/${this.props.match.params.id}`)
    .then(r => r.json())
    .then(chat => this.props.selectChat(chat))
  }

  handleReceivedMessage = response => {
    const { message } = response;
    console.log(response);
    let chat = {...this.props.activeChat.activeChat}
    chat.messages = [...chat.messages, message];
    this.props.addMessage(chat);
  };

  handleReceivedSubscription = response => {
    const userId = response.user.id;
    let chat = {...this.props.activeChat.activeChat}
    if (this.props.activeChat.activeChat.users.find(user => user.id === userId)) {
      const targetUser = chat.users.find(user => user.id === userId)
      const userIndex = chat.users.indexOf(targetUser)
      chat.users = [...chat.users.slice(0, userIndex)].concat([...chat.users.slice(userIndex + 1)])
      this.props.addMessage(chat)
    } else {
      chat.users = [...chat.users, response.user];
      this.props.addMessage(chat)
    }
  }

  render() {
    // console.log(this.props);
    // console.log(this.props.activeChat.activeChat)
    console.log(this.props.match.params.id);
    const testingChat =  this.props.activeChat.activeChat?  this.props.activeChat.activeChat.id : console.log("nothing")
    return (
      <React.Fragment>
        <Navbar/>
        {  this.props.activeChat.activeChat &&  <div>
            <ActionCable
              channel={{ channel: 'MessagesChannel', chat: this.props.activeChat.activeChat.id}}
              onReceived={this.handleReceivedMessage}
              />
            <ActionCable
              channel={{ channel: 'SubscriptionsChannel', chat: this.props.activeChat.activeChat.id }}
              onReceived={this.handleReceivedSubscription}
            />
              <Message messages={this.props.activeChat.activeChat.messages}/>
              <NewMessageForm chatId={this.props.activeChat.activeChat.id}/>
              <Joiners joiners={this.props.activeChat.activeChat.users}/>
            </div>
          }

      </React.Fragment>
    );
  }

}

const mapStateToProps = ({chatsReducer: activeChat}) => ({ activeChat })

const mapDispatchToProps = dispatch => ({
  addMessage: chat => dispatch({type: "ADD_MESSAGE", chat}),
  selectChat: chat => dispatch({type: "SELECT_CHAT", chat})
})

export default connect(mapStateToProps, mapDispatchToProps) (Chatroom);

// {this.props.chat.messages.map(message => message.content)}
