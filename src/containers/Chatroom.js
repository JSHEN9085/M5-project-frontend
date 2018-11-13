import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import Joiners from '../components/Joiners';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import Messages from '../components/Messages';
import BackgroundSlideshow from 'react-background-slideshow';
import Background6 from '../Img/bg-6.jpg';
import Background7 from '../Img/bg-7.jpg';
import Background8 from '../Img/bg-8.jpg';
import Background9 from '../Img/bg-9.jpg';
import Background10 from '../Img/bg-10.jpg';
import Background11 from '../Img/bg-11.jpg';
import Background12 from '../Img/bg-12.jpg';
import Background13 from '../Img/bg-13.jpg';
import Background14 from '../Img/bg-14.jpg';
import Background15 from '../Img/bg-15.jpg';
import Background16 from '../Img/bg-16.jpg';
import Background17 from '../Img/bg-17.jpg';
import Background18 from '../Img/bg-18.jpg';
import Background19 from '../Img/bg-19.jpg';
import Break from '../Img/break.jpg';

class Chatroom extends Component {

  componentDidMount(){
    fetch(`${API_ROOT}/chats/${this.props.match.params.id}`)
    .then(r => r.json())
    .then(chat => {
      fetch(`${API_ROOT}/chats/${this.props.match.params.id}/messages`)
      .then(r => r.json())
      .then(messages => {
        chat.messages = messages
        if ( chat.users.find(user => user.id === this.props.user.user.id ) ){
          this.props.selectChat(chat)
        } else {
          chat.users.push(this.props.user.user)
          this.props.selectChat(chat)
        }
      })
    })
  }

  handleReceivedMessage = response => {
    const { message } = response;
    let chat = {...this.props.activeChat.activeChat};
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

  handleBreak = (event) => {
    this.props.changeBreakMode()
  }

  render() {
    // console.log(this.props);
    return (
      <React.Fragment>
        <Navbar history={this.props.history}/>
         {this.props.activeChat.activeChat? (<div className="chatroom" >
            <ActionCable
              channel={{ channel: 'MessagesChannel', chat: this.props.activeChat.activeChat.id}}
              onReceived={this.handleReceivedMessage}
              />
            <ActionCable
              channel={{ channel: 'SubscriptionsChannel', chat: this.props.activeChat.activeChat.id }}
              onReceived={this.handleReceivedSubscription}
            />
            <Messages />
            <Joiners joiners={this.props.activeChat.activeChat.users}/>
          </div>
          )
          :
          null
        }
        <button onClick={this.handleBreak}><img className="break-button" src={Break} alt="" style={this.props.user.onBreak ? {opacity: 0.3} : {opacity: 1}}/></button>
        <BackgroundSlideshow
          images={[ Background6, Background7, Background8, Background9, Background10,
            Background11, Background12, Background13, Background14, Background15, Background16,
            Background17, Background18, Background19
          ]}
          animationDelay={4000}/>
      </React.Fragment>
    );
  }

}

const mapStateToProps = ({chatsReducer: activeChat, usersReducer: user}) => ({ activeChat, user })

const mapDispatchToProps = dispatch => ({
  addMessage: chat => dispatch({type: "ADD_MESSAGE", chat}),
  selectChat: chat => dispatch({type: "SELECT_CHAT", chat}),
  changeBreakMode: () => dispatch({type: "CHANGE_BREAK_MODE"})
})

export default connect(mapStateToProps, mapDispatchToProps) (Chatroom);

// {this.props.chat.messages.map(message => message.content)}
// <Message messages={this.props.activeChat.activeChat.messages}/>
// <NewMessageForm chatId={this.props.activeChat.activeChat.id}/>
// <Joiners joiners={this.props.activeChat.activeChat.users}/>
