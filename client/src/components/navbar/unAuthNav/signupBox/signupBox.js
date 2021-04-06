import React, { Component } from "react";
import "./signupBox.css";
import OTPBox from "./OTPBox/OTPBox";
import AuthContext from "../../../../context/auth-context";

class SignupBox extends Component {
  state = { email: "", isHospital: false };
  static contextType = AuthContext;
  onFormSubmit = (event) => {
    event.preventDefault();
    this.context.onEmailSubmit(this.state);
  };
  onResend = () => {
    this.context.onEmailSubmit(this.state);
  };
  // onTypeChange = (event) => {
  //   this.setState({ isHospital: !this.state.isHospital });
  // };
  onTypePerson = (event) => {
    this.setState({ isHospital: false });
  };
  onTypeHospital = (event) => {
    this.setState({ isHospital: true });
  };
  render() {
    var Box = null;
    if (this.context.displayOTPBox === "true") {
      Box = <OTPBox onResend={this.onResend}></OTPBox>;
    } else if (this.context.displayOTPBox === "exists") {
      Box = (
        <div>Email ID already exists, please change EmailID and try again!</div>
      );
    } else if (this.context.displayOTPBox === "false") {
      Box = <div>Something went wrong!!</div>;
    }
    return (
      <div>
        <div
          class="modal fade"
          id="signupModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeSignupBox"
                ></button>
              </div>
              <div class="modal-body">
                <div class="card w-100" style={{ width: 18 + "rem" }}>
                  <div class="card-body" style={{ backgroundColor: "bisque" }}>
                    <h5 class="card-title">Profile Details</h5>
                    <p class="card-text">
                      <center>
                        <form onSubmit={this.onFormSubmit}>
                          <div
                            class="inputtext"
                            style={{ fontStyle: "italic", fontSize: 20 + "px" }}
                          >
                            <b>Email : </b>{" "}
                            <input
                              type="email"
                              id="text1"
                              placeholder=" Enter your valid email id "
                              value={this.state.email}
                              onChange={(e) =>
                                this.setState({ email: e.target.value })
                              }
                              disabled={this.context.disableEmail}
                              required
                            />
                            <br />
                            <br />
                            <input
                              type="radio"
                              value="person"
                              name="accountType"
                              // checked="checked"
                              onChange={this.onTypePerson}
                              disabled={this.context.disableEmail}
                              required
                            />
                            <b>Person</b>
                            <br />
                            <input
                              type="radio"
                              value="Hospital"
                              name="accountType"
                              onChange={this.onTypeHospital}
                              disabled={this.context.disableEmail}
                              required
                            />
                            <b>Hospital</b>
                            <br />
                          </div>
                          <br />
                          <div>
                            <button
                              type="submit"
                              class="btn btn-primary"
                              disabled={this.context.disableEmail}
                            >
                              submit
                            </button>
                          </div>
                        </form>
                        {Box}
                      </center>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupBox;