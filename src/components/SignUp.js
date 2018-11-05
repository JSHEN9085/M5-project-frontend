import React, { Component } from 'react';
import {API_ROOT, HEADERS} from '../constants/index';

class SignUp extends Component {

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password_digest: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password_digest: this.state.password_digest,
        city_location: "Manhattan",
        state_location: "New York"
      })
    }).then(r => r.json())
    .then(console.log)
  }

  render() {
    return (
      <form className="" onSubmit={this.handleSubmit} >
        <input onChange={this.handleChange} type="text" name="firstname" value={this.state.firstname} placeholder="Firstname" />
        <input onChange={this.handleChange} type="text" name="lastname" value={this.state.lastname} placeholder="Lastname"/>
        <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="Email" />
        <input onChange={this.handleChange} type="text" name="password_digest" value={this.state.password_digest} placeholder="Password"/>
        <input type="submit" name="submit"/>
      </form>
    )
  }

}

export default SignUp;
