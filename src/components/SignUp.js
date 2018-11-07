import React, { Component } from 'react';
import {API_ROOT, HEADERS} from '../constants/index';
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// import Paper from "@material-ui/core/Paper";
import { NavLink } from "react-router-dom";
import userLarge from '../Img/userLarge.jpg'
import userSmall from '../Img/userSmall.jpg'


class SignUp extends Component {

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password_digest: ""
  }

  handleOnChange = (event) => {
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
        large_picture: userLarge,
        small_picture: userSmall,
        city_location: "Manhattan",
        state_location: "New York"
      })
    }).then(r => r.json())
    .then(console.log)
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main className="login-form">
          <form onSubmit={this.handleSubmit} className="signup">
            <h1 className="log">SignUp</h1>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                htmlFor="username"
                style={{
                  color: "white"
                }}
              >
                Firstname
              </InputLabel>
              <Input
                onChange={this.handleOnChange}
                name="firstname"
                className="color"
                style={{
                  color: "white"
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                htmlFor="username"
                style={{
                  color: "white"
                }}
              >
                Lastname
              </InputLabel>
              <Input
                onChange={this.handleOnChange}
                name="lastname"
                className="color"
                style={{
                  color: "white"
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                style={{
                  color: "white"
                }}
                htmlFor="email"
              >
                Email Address
              </InputLabel>
              <Input
                onChange={this.handleOnChange}
                name="email"
                className="color"
                style={{
                  color: "white"
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                style={{
                  color: "white"
                }}
                htmlFor="password"
              >
                Password
              </InputLabel>
              <Input
                onChange={this.handleOnChange}
                name="password_digest"
                type="password"
                className="color"
                style={{
                  color: "white"
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.handleClick}
              style={{
                paddingLeft: 100,
                paddingRight: 100,
                backgroundColor: "#1B1B1D"
              }}
            >
              <NavLink
                style={{
                  color: "white"
                }}
                to="/mainpage"
              >
                SignUp
              </NavLink>
            </Button>
          </form>
        </main>
      </React.Fragment>
    )
  }

}

export default SignUp;

// <form className="" onSubmit={this.handleSubmit} >
//   <input onChange={this.handleChange} type="text" name="firstname" value={this.state.firstname} placeholder="Firstname" />
//   <input onChange={this.handleChange} type="text" name="lastname" value={this.state.lastname} placeholder="Lastname"/>
//   <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="Email" />
//   <input onChange={this.handleChange} type="text" name="password_digest" value={this.state.password_digest} placeholder="Password"/>
//   <input type="submit" name="submit"/>
// </form>
// "#16203d"
