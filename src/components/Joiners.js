import React, { Component } from 'react';
import { Image} from 'semantic-ui-react';
import Flatiron from '../Img/userSmall.jpg'
import { connect } from 'react-redux';

class Joiners extends Component {

  componentDidMount(){
    if ( !this.props.joiners.find(joiner => joiner.id === this.props.user.user.id) ){
      let chat = {...this.props.chats.activeChat}
      chat.users = [...chat.users].concat(this.props.user.user)
      this.props.addMessage(chat)
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="joiner-list" style={this.props.user.onBreak ? {opacity: 0.3} : {opacity: 1}}>
          {this.props.joiners.map(joiner => (
            <div className="joiner" key={joiner.id} joiner={joiner}>
              {joiner.small_picture ? <Image avatar src={joiner.small_picture} /> : <Image avatar src={Flatiron}/>}
              {joiner.firstname} {joiner.lastname}
            </div>))}
      </div>
    )
  }
};

const mapStateToProps = ({ usersReducer: user, chatsReducer: chats }) => ({ user, chats })

const mapDispatchToProps = dispatch => ({
  addMessage: chat => dispatch({type: "ADD_MESSAGE", chat}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Joiners)
