import React, { Component } from 'react';
import "../index.css";
import {Button, Modal} from 'semantic-ui-react';
import {API_ROOT} from '../constants/index'
import { connect } from 'react-redux';
import NewChatForm from '../components/NewChatForm';
import Navbar from '../components/Navbar';
import ChatList from '../containers/ChatList'


class MainPage extends Component {

  state = {
    modalOpen: false,
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

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleSearch = (event) => {
    let originalChats = this.props.chats.initialChats;
      if (event.target.value === ""){
        this.props.filterChats(originalChats)
      } else {
        let filteredChats = originalChats.filter(chat => chat.topic.toLowerCase().includes(event.target.value.toLowerCase()))
        this.props.filterChats(filteredChats)
      }
  }

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
              onChange={this.handleSearch}
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

const mapStateToProps = ({ usersReducer: user, chatsReducer: chats }) => ({ user, chats })


const mapDispatchToProps = dispatch => ({
  initialChats: chats => dispatch({type: "INITIAL_CHATS", chats}),
  filterChats: chats => dispatch({type: "FILTER_CHATS", chats})
})

export default connect(mapStateToProps, mapDispatchToProps) (MainPage);
