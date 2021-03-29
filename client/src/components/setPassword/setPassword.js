import React, { Component } from "react";
import classes from "./SetPassword.css";

class SetPassword extends Component {
  render() {
    return (
      <div>
        <div class="centerbox">
          <center>
            <div>
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
              Reenter Password :
              <input
                id="text2"
                placeholder=" Renter the password "
                type="password"
              />
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
