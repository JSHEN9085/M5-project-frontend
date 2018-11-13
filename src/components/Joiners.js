import React, { Component } from 'react';
import { Image} from 'semantic-ui-react';
import Flatiron from '../Img/userSmall.jpg'
import { connect } from 'react-redux';

class Joiners extends Component {

  render() {
    return (
      <div className="joiner-list" style={this.props.user.onBreak ? {opacity: 0.3} : {opacity: 1}}>
          {this.props.joiners.map(joiner => (
            <div className="joiner" key={joiner.id} joiner={joiner}>
              {joiner.small_picture ? <Image avatar src={joiner.small_picture} /> : <Image avatar src={Flatiron}/>}
              {joiner.firstname} {joiner.lastname}
            </div>))}
      </div>)
  }
};

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default connect(mapStateToProps)(Joiners)
