import React, { Component } from "react";
import "./setPassword.css";

class SetPassword extends Component {
  render() {
    return (
      <div>
        <div class="centerbox">
          <center>
            <div>
              <br />
              <br />
              <label>Password :</label>
              <input
                id="text2"
                placeholder=" Enter the password "
                type="password"
              ></input>
              <br />
              <br />
              <label>Re-enter Password :</label>
              <input
                id="text3"
                placeholder=" Renter the password "
                type="password"
              ></input>
            </div>
            <br />
            <br />
            <div class="buttons">
              <button class="submit">Next</button>
              <br />
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default SetPassword;
