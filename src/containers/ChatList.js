import React, { Component } from 'react';
import Chat from '../components/Chat';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import '../index.css'

class ChatList extends Component {

  handleReceivedChat = response => {
    const { chat } = response;
    this.props.addChat(chat)
  };

  handleFilterTopic = (event) => {
    let chats = [...this.props.chats.chats];
    if (this.props.chats.ifFiltered === true) {
      chats.sort((chat1, chat2) => ('' + chat1.topic).localeCompare(chat2.topic))
      this.props.filterChats(chats)
      this.props.switchFilter()
    } else {
      chats.sort((chat1, chat2) => chat1.id - chat2.id)
      this.props.filterChats(chats)
      this.props.switchFilter()
    }
  }

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
              <th onClick={this.handleFilterTopic}>
                <h3 className="ui center aligned header 2">
                  Topic
                  <Icon name='caret down'/>
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
            {this.props.chats.chats.map(chat => <Chat key={chat.id} chat={chat} history={this.props.history}/>)}
          </tbody>
        </table>
      </React.Fragment>
    );
  }

}

const mapStateToProps = ( {chatsReducer: chats, ifFiltered}) => ({ chats, ifFiltered })

const mapDispatchToProps = dispatch => ({
  addChat: chat => dispatch({type: "ADD_CHAT", chat}),
  filterChats: chats => dispatch({type: "FILTER_CHATS", chats}),
  switchFilter: () => dispatch({type: "SWITCH_FILTER"})
})

export default connect(mapStateToProps, mapDispatchToProps) (ChatList);
