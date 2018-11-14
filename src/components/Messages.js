import React, { Component } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { connect } from 'react-redux';
import Message from './Message';
import { Button, Icon } from 'semantic-ui-react'

class Messages extends Component {

  state = {
    content: '',
    openEmoji: false
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleShowEmoji = (e) => {
    this.setState({
      openEmoji: !this.state.openEmoji
    })
  }


  addEmoji = (e) => {
    console.log(e.unified)
    if (e.unified.length <= 5){
      let emojiPic = String.fromCodePoint(`0x${e.unified}`)
      this.setState({
        content: this.state.content + emojiPic
      })
    }else {
      let sym = e.unified.split('-')
      let codesArray = []
      sym.forEach(el => codesArray.push('0x' + el))
      //console.log(codesArray.length)
      //console.log(codesArray)  // ["0x1f3f3", "0xfe0f"]
      let emojiPic = String.fromCodePoint(...codesArray)
      this.setState({
        content: this.state.content + emojiPic
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/chats/${this.props.chats.activeChat.id}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        content: this.state.content,
        chat_id: this.props.chats.activeChat.id,
        user_id: this.props.user.user.id
      })
    });
    this.setState({ content: '' });
  };

  render() {
    return (
      <div className="wrapper" style={this.props.user.onBreak ? {opacity: 0.3} : {opacity: 1}}>
        <div className="main-container">

          <div className="message-area" >
            {this.props.chats.activeChat.messages.length ? this.props.chats.activeChat.messages.slice(-5).map(message => <Message key={message.id} message={message}/> ) : null}
          </div>


          <div className="enter-area">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Enter Message..."
                name="content"
                id="message-ent"
                value={this.state.content}
                onChange={this.handleChange}
                />
              <p style={{cursor: 'pointer'}} className="emoji-button" onClick={this.handleShowEmoji} >
                  {String.fromCodePoint(0x1f60a)}
                </p>
              <input type="submit" id="message-send"/>
            </form>
          </div>

          <div >
            {this.state.openEmoji ? <Picker onSelect={this.addEmoji} className="emoji"/> : null}
          </div>

        </div>
      </div>
    );
  }

}

const mapStateToProps = ({ usersReducer: user, chatsReducer: chats }) => ({ user, chats })

export default connect(mapStateToProps)(Messages);
