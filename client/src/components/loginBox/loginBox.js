import React, { Component } from "react";
import "./loginBox.css";

class LoginBox extends Component {
  render() {
    return (
      <div class="centerbox">
        <center>
          <div class="inputtext">
            Email :<input id="text1" placeholder=" Enter your email id " />
            <br />
            <br />
            Password :
            <input
              id="text2"
              placeholder=" Enter the password "
              type="password"
            />
            <br />
            <br />
          </div>
          <div class="buttons">
            <button class="submit">submit</button>
            <br />
            <br />
            <button class="forgetpass">forgot password</button>
          </div>
        </center>
      </div>
    );
  }
}

export default LoginBox;
