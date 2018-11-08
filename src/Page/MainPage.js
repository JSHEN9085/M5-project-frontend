import React, { Component } from 'react';
import "../index.css";
import {Button} from 'semantic-ui-react';
import {API_ROOT} from '../constants/index'
import { connect } from 'react-redux';
import NewChatForm from '../components/NewChatForm';
import Navbar from '../components/Navbar';
import Message from '../components/Message'
import ChatList from '../containers/ChatList'
import Chatroom from '../components/Chatroom'
import { Redirect } from 'react-router';


class MainPage extends Component {

  state = {
    createNewChat: false
  }

  componentDidMount () {
    fetch(`${API_ROOT}/chats`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r => r.json())
    .then(chats => this.props.initialChats(chats) )
  }

  handleCreate = (event) => {
    this.setState({
      createNewChat: true
    })
  }

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
    return (
        <React.Fragment>

          <Navbar/>

          <div className="ui segment violet inverted">
            <h2>Flatiron RealTime Forum</h2>
          </div>

          <div className="ui huge fluid icon input">
            <input
              type="text"
              placeholder={"Search by Topic"}
            />
            <i className="circular search link icon"></i>
          </div>

          <Button onClick={this.handleCreate} > Create New Chat </Button>

          {this.state.createNewChat? <NewChatForm /> : null}

          <ChatList history={this.props.history}/>

        </React.Fragment>
    );
  }
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })


const mapDispatchToProps = dispatch => ({
  initialChats: chats => dispatch({type: "INITIAL_CHATS", chats}),
})

export default connect(mapStateToProps, mapDispatchToProps) (MainPage);



// const findActiveChat = (chats, activeChat) => {
//   return chats.find(
//     chat => chat.id === activeChat
//   );
// };
//
// const mapChats = (chats, handleClick) => {
//   return chats.map(chat => {
//     return (
//       <li key={chat.id} onClick={() => handleClick(chat.id)}>
//         {chat.topic}
//       </li>
//     );
//   });
// };

// <div className="chat-list">
//   <ActionCable
//     channel={{ channel: 'ChatsChannel' }}
//     onReceived={this.handleReceivedChat}
//   />
//   {this.state.chats.length ? (
//       <Chat
//         chats={this.state.chats}
//         handleReceivedMessage={this.handleReceivedMessage}
//       />
//     ) : null}
//   <h2>Conversations</h2>
//   <ul>{mapChats(this.state.chats, this.handleClick)}</ul>
// </div>
// <NewChatForm/>
//   {this.state.activeChat ? (
//       <Message
//         chat={findActiveChat(
//           this.state.chats,
//           this.state.activeChat
//         )}
//       />
//     ) : null}



//current version
