import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewMessageForm extends React.Component {
  state = {
    content: '',
    chat_id: 1,
    user_id: 1
  };

  // componentWillReceiveProps = nextProps => {
  //   this.setState({ chat_id: nextProps.chat_id });
  // };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/chats/${this.state.chat_id}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        content: this.state.content,
        chat_id: 1,
        user_id: 1
      })
    });
    this.setState({ content: '' });
  };

  render = () => {
    console.log(this.state.chat_id)
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
