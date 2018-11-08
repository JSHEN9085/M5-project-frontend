import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { connect } from 'react-redux';

class NewChatForm extends React.Component {
  state = {
    topic: '',
    creator_id: this.props.user.user.id   //this need to be changed to current user's ID
  };

  handleChange = e => {
    this.setState({ topic: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/chats`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    })
    this.setState({ topic: '' });
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Chat:</label>
          <br />
          <input
            type="text"
            value={this.state.topic}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })


export default connect(mapStateToProps)(NewChatForm);
