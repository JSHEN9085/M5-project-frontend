import React, { Component } from "react";
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { loginUser } from '../action/user'



class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault()
    this.setState({email: "", password: ""})
    this.props.loginUser(this.state.email, this.state.password)
  };

  render() {
    const { active } = this.state;
    return this.props.loggedIn ? (
      <Redirect to="/mainpage" />
      ) : (
      <React.Fragment>
        <CssBaseline />
        <main className="login-form">
          <form className="login" onSubmit={this.handleSubmit}>
            <h1 className="log">Log In </h1>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                htmlFor="email"
                style={{
                  color: "white"
                }}
              >
                Email Address
              </InputLabel>
              <Input
                onChange={this.handleOnChange}
                value={this.state.email}
                id="email"
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
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                className="color"
                value={this.state.password}
                style={{
                  color: "white"
                }}
              />
            </FormControl>
            <br/>
            <br/>
            <br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"

              style={{
                color: "white",
                paddingLeft: 100,
                paddingRight: 100,
                backgroundColor: active ? "#e55b00" : "#16203d"
              }}
            >
            Log In
            </Button>
          </form>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ usersReducer: {authenticatingUser, failedLogin, error, loggedIn, currentUser } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn,
  currentUser
})

export default connect(mapStateToProps, {loginUser}) (Login);
