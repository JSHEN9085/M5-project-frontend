import React, { Component } from 'react';
import "../index.css";
import {Button, Modal} from 'semantic-ui-react';
import {API_ROOT} from '../constants/index'
import { connect } from 'react-redux';
import NewChatForm from '../components/NewChatForm';
import Navbar from '../components/Navbar';
import Message from '../components/Message'
import ChatList from '../containers/ChatList'
import Chatroom from '../containers/Chatroom'
import { Redirect } from 'react-router';


class MainPage extends Component {

  state = {
    modalOpen: false
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

  // handleReceivedMessage = response => {
  //   const { message } = response;
  //   const chats = [...this.state.chats];
  //   const chat = chats.find(
  //     chat => chat.id === message.chat_id
  //   );
  //   chat.messages = [...chat.messages, message];
  //   this.setState({ chats });
  // };

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
        <React.Fragment>

          <Navbar/>

          <div className="ui segment blue inverted">
            <h2>Flatiron RealTime Forum</h2>
          </div>

          <div className="ui huge fluid icon input">
            <input
              type="text"
              placeholder={"Search by Topic"}
            />
            <i className="circular search link icon"></i>
          </div>
          <br/>
          <Modal
            trigger={<Button primary onClick={this.handleOpen} className=" ui button"> Create New Chat </Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            >
            <NewChatForm handleClose={this.handleClose}/>
          </Modal>

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
