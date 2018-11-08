import React, { Component } from 'react';
import Home from './Page/Home'
import { withRouter } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Home history={this.props.history}/>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
