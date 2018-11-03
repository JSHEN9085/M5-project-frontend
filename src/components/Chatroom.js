import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import Message from './Message'
import NewMessageForm from './NewMessageForm'
import Joiners from './Joiners'
import { connect } from 'react-redux'

class Chatroom extends Component {

  handleReceivedMessage = response => {
    console.log(response);
    const { message } = response;
    let chat = {...this.props.chat}
    chat.messages = [...chat.messages, message];
    this.setState({ chat });
  };

  render() {
    console.log(this.props.activeChat.messages)
    // console.log(this.state.chat);
    // console.log(this.props.chat.messages)
    return (
      <div>
      <ActionCable
        channel={{ channel: 'MessagesChannel', chat: this.props.activeChat.id}}
        onReceived={this.handleReceivedMessage}
        />
        <Message messages={this.props.activeChat.messages}/>
        <NewMessageForm chatId={this.props.activeChat.id}/>
        <Joiners joiners={this.props.activeChat.users}/>
      </div>
    );
  }

}

const mapStateToProps = ({ activeChat }) => ({ activeChat })


export default connect(mapStateToProps) (Chatroom);

// {this.props.chat.messages.map(message => message.content)}
