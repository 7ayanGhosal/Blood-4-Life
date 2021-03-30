import React, { Component } from "react";
import "./loginBox.css";

class LoginBox extends Component {
  render() {
    return (
      <div className="centerbox">
        <center>
          <div className="inputtext">
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
          <div className="buttons">
            <button className="submit">submit</button>
            <br />
            <br />
            <button className="forgetpass">forgot password</button>
          </div>
        </center>
      </div>
    );
  }
}

export default LoginBox;
