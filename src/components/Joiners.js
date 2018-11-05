import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';

class Joiners extends Component {

  handleReceivedSubscription = response => {
    console.log(response);
  }

  render () {
    console.log(this.props.joiners);
    return (
      <div>
      {this.props.joiners.map(joiner => <li>{joiner.fristname}</li>)}
      </div>
    )
  }
};

export default Joiners;
