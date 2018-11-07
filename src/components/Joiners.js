import React, { Component } from 'react';
import {Button, Image} from 'semantic-ui-react';
import { ActionCable } from 'react-actioncable-provider';

class Joiners extends Component {

  handleReceivedSubscription = response => {
    console.log(response);
  }

  render () {
    console.log(this.props.joiners);
    return (
      <div className="joiner-list">
        {this.props.joiners.map(joiner => <div className="joiner"><Image avatar src={joiner.small_picture}/> {joiner.firstname}</div>)}
      </div>
    )
  }
};

export default Joiners;
