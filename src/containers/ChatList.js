import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';
import "../index.css";
import {Button} from 'semantic-ui-react';
import {API_ROOT} from '../constants/index'
import { ActionCable } from 'react-actioncable-provider';
import NewChatForm from '../components/NewChatForm';
import Chat from '../components/Chat';
import Message from '../components/Message'

class ChatList extends Component {

  state = {
    chats: [],
    activeChat: null
  }

  componentDidMount () {
    fetch(`${API_ROOT}/chats`)
    .then(r => r.json())
    .then(chats => this.setState({chats}) )
  }

  handleClick = id => {
    this.setState({ activeChat: id });
  };

  handleReceivedChat = response => {
    const { chat } = response;
    this.setState({
      chats: [...this.state.chats, chat]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const chats = [...this.state.chats];
    const chat = chats.find(
      chat => chat.id === message.chat_id
    );
    chat.messages = [...chat.messages, message];
    this.setState({ chats });
  };

  render() {
    // const { chats, activeConversation } = this.state;

    // console.log(this.state.chats);
    return (
      <React.Fragment>
      <div className="chat-list">
        <ActionCable
          channel={{ channel: 'ChatsChannel' }}
          onReceived={this.handleReceivedChat}
        />
        {this.state.chats.length ? (
            <Chat
              chats={this.state.chats}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          ) : null}
        <h2>Conversations</h2>
        <ul>{mapChats(this.state.chats, this.handleClick)}</ul>
      </div>
      <NewChatForm/>
        {this.state.activeChat ? (
            <Message
              chat={findActiveChat(
                this.state.chats,
                this.state.activeChat
              )}
            />
          ) : null}
      </React.Fragment>
    );
  }

}

export default ChatList;

const findActiveChat = (chats, activeChat) => {
  return chats.find(
    chat => chat.id === activeChat
  );
};

const mapChats = (chats, handleClick) => {
  return chats.map(chat => {
    return (
      <li key={chat.id} onClick={() => handleClick(chat.id)}>
        {chat.topic}
      </li>
    );
  });
};
