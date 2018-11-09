import React, { Component } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { connect } from 'react-redux';
import Message from './Message';

class Messages extends Component {

  state = {
    content: '',
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

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
      <div className="wrapper">
        <div className="main-container">

          <div className="message-area">
            {this.props.chats.activeChat.messages.length ? this.props.chats.activeChat.messages.map(message => <Message key={message.id} message={message}/> ) : null}
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
              <input type="submit" id="message-send"/>
            </form>
          </div>

        </div>
      </div>
    );
  }

}

const mapStateToProps = ({ usersReducer: user, chatsReducer: chats }) => ({ user, chats })

export default connect(mapStateToProps)(Messages);
