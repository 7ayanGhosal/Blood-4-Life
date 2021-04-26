import React, { Component } from "react";
import "./bloodBank.css";
import AuthContext from "../../../context/auth-context";

class BloodBank extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <div class="back">
        <div class="container">
          <center>
            <h1>Blood Bank Archive</h1>
            <div class="row">
              <div class="col-sm">
                <div class="col-name">
                  <p class="text1">
                    <h2 class="rhfactor">Rh Positive</h2>
                  </p>
                </div>{" "}
                <br></br>
                <p class="text">
                  A+{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    defaultValue="0"
                  />
                </p>
                <br></br>
                <p class="text">
                  B+{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    defaultValue="0"
                  />
                </p>
                <br></br>
                <p class="text">
                  AB+{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    defaultValue="0"
                  />
                </p>
                <br></br>
                <p class="text">
                  O+{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    defaultValue="0"
                  />
                </p>
                <br></br>
              </div>
              <div class="col-sm">
                <div class="col-name">
                  <p class="text1">
                    <h2 class="rhfactor">Rh Negative</h2>
                  </p>
                </div>{" "}
                <br></br>
                <p class="text">
                  A-{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    defaultValue="0"
                  />
                </p>
                <br></br>
                <p class="text">
                  B-{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    defaultValue="0"
                  />
                </p>
                <br></br>
                <p class="text">
                  AB-{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    defaultValue="0"
                  />
                </p>
                <br></br>
                <p class="text">
                  O-{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    defaultValue="0"
                  />
                </p>
                <br></br>
              </div>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default BloodBank;
