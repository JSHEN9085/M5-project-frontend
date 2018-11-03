import React, { Component } from 'react';
import Chat from '../components/Chat';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux';

import '../index.css'

class ChatList extends Component {

  // handleReceivedMessage = response => {
  //   const { message } = response;
  //   const chats = [...this.props.chats];
  //   const chat = chats.find(
  //     chat => chat.id === message.chat_id
  //   );
  //   chat.messages = [...chat.messages, message];
  //   this.setState({ chats });
  // };

  handleReceivedChat = response => {
    const { chat } = response;
    this.props.addChat(chat)
  };

  render() {
    return (
      <React.Fragment>

        <div className="chat-list">
          <ActionCable
            channel={{ channel: 'ChatsChannel' }}
            onReceived={this.handleReceivedChat}
          />
        </div>

        <table className="ui celled striped padded table">
          <tbody>
            <tr>
              <th>
                <h3 className="ui center aligned header 1">
                  Created By
                </h3>
              </th>
              <th>
                <h3 className="ui center aligned header 2">
                  Topic
                </h3>
              </th>
              <th>
                <h3 className="ui center aligned header 3">
                  Last Updated
                </h3>
              </th>
              <th>
                <h3 className="ui center aligned header join">
                  Let's Chat
                </h3>
              </th>
            </tr>
            {this.props.chats.map(chat => <Chat key={chat.id} chat={chat} history={this.props.history}/>)}
          </tbody>
        </table>
      </React.Fragment>
    );
  }

}

const mapStateToProps = ( {chats}) => ({ chats })

const mapDispatchToProps = dispatch => ({
  addChat: chat => dispatch({type: "ADD_CHAT", chat})
})

export default connect(mapStateToProps, mapDispatchToProps) (ChatList);
