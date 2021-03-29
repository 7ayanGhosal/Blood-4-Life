import React, { Component } from "react";
import classes from "./accountDetails.css";

class AccountDetails extends Component {
  render() {
    return (
      <div>
        <div class="centerbox">
          <center>
            <div>
              First Name :
              <input
                id="text2"
                placeholder=" Enter your first name "
                type="text"
              />
              <br />
              <br />
              Last Name :
              <input
                id="text2"
                placeholder=" Enter your Last name "
                type="text"
              />
              <br />
              <br />
              Gender :
              <select>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <br />
              <br />
              Blood Group:
              <select>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
              <br />
              <br />
              Rh factor :
              <select>
                <option value="positive">Positive</option>
                <option value="negetive">Negetive</option>
              </select>
            </div>
            <br />
            <div class="buttons">
              <button class="submit">Next</button>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default AccountDetails;
