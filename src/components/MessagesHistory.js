import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';

class MessagesHistory extends Component {

  state = {
    filteredMessages: this.props.chats.activeChat.messages
  }

  handleSearch = (event) => {
    if (event.target.value === ""){
      this.setState({filteredMessages: this.props.chats.activeChat.messages})
    } else {
      const filteredMessages = this.props.chats.activeChat.messages.filter(message => message.content.toLowerCase().includes(event.target.value))
      this.setState({filteredMessages})
    }
  }

  render() {
    console.log(this.state.searchBy);
    return (
      <div className="messages-history-container">
        <div className="ui huge fluid icon input">
          <input
            type="text"
            placeholder={"Search by Content"}
            onChange={this.handleSearch}
          />
          <i className="circular search link icon"></i>
        </div>
        <br/>
        {this.props.chats.activeChat.messages.length ?
          this.state.filteredMessages.map(message => <Message key={message.id} message={message}/> )
          :
          <div className="no-messages">This Room Still Has No Message</div>}
      </div>
    );
  }

}

const mapStateToProps = ({ usersReducer: user, chatsReducer: chats }) => ({ user, chats })


export default connect(mapStateToProps)(MessagesHistory);
