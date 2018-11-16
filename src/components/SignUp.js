import React, { Component } from 'react';
import {API_ROOT, HEADERS} from '../constants/index';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import userLarge from '../Img/userLarge.jpg'
import userSmall from '../Img/userSmall.jpg'
import { connect } from "react-redux";
import { loginUser } from '../action/user';
import { Redirect } from 'react-router';


class SignUp extends Component {

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
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
        user: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      }
      })
    }).then(r => r.json())
    .then(response => {
        if (response.user) {
          this.props.loginUser(this.state.email, this.state.password)
        } else {
          alert("This Email has been registered")
        }
      }
    )
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to="/mainpage" />
    ) : (
      <React.Fragment>
        <CssBaseline />
        <main className="login-form">
          <form onSubmit={this.handleSubmit} className="signup">
            <h1 className="log">Sign Up</h1>
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
                value={this.state.firstname}
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
                value={this.state.lastname}
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
                value={this.state.email}
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
                name="password"
                type="password"
                className="color"
                value={this.state.password}
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
                SignUp
            </Button>
          </form>
        </main>
      </React.Fragment>
    )
  }

}

const mapStateToProps = ({ usersReducer: {authenticatingUser, failedLogin, error, loggedIn, currentUser } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn,
  currentUser
})

export default connect(mapStateToProps, {loginUser})(SignUp)
