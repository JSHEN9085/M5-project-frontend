import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { connect } from 'react-redux';

class NewMessageForm extends React.Component {
  state = {
    content: '',
  };

  // componentWillReceiveProps = nextProps => {
  //   this.setState({ chat_id: nextProps.chat_id });
  // };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  addEmoji = (e) => {
    console.log(e.unified)
    // if (e.unified.length <= 5){
    //   let emojiPic = String.fromCodePoint(`0x${e.unified}`)
    //   this.setState({
    //     text: this.state.text + emojiPic
    //   })
    // }else {
    //   let sym = e.unified.split('-')
    //   let codesArray = []
    //   sym.forEach(el => codesArray.push('0x' + el))
    //   //console.log(codesArray.length)
    //   //console.log(codesArray)  // ["0x1f3f3", "0xfe0f"]
    //   let emojiPic = String.fromCodePoint(...codesArray)
    //   this.setState({
    //     text: this.state.text + emojiPic
    //   })
    // }
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/chats/${this.state.chat_id}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        content: this.state.content,
        chat_id: this.props.chatId,
        user_id: this.props.user.user.id
      })
    });
    this.setState({ content: '' });
  };

  render = () => {
    console.log(this.props)
    return (
      <div className="message-input-container">
        <form onSubmit={this.handleSubmit}>
          <input
            className="message-input"
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  };
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default connect(mapStateToProps)(NewMessageForm);

// <span>
//   <Picker onSelect={this.addEmoji} />
// </span>
