import React, { Component } from "react";
import "./resetPass.css";
import OTPBox from "./OTPBox/OTPBox";
import PasswordSetter from "./passwordSetter/passwordSetter";
import AuthContext from "../../../../../context/auth-context";

class ResetPass extends Component {
  state = { email: "", boxName: "ResetPassBox" };
  static contextType = AuthContext;
  onFormSubmit = (event) => {
    event.preventDefault();
    this.context.onEmailSubmit(this.state);
  };
  onChangeEmail = () => {
    document.getElementById("ResetPassOTPBox").style.display = "none";
    document.getElementById("ResetPassEmail").removeAttribute("disabled");
    document.getElementById("ResetPassSubmit").removeAttribute("disabled");
  };
  onResend = () => {
    this.context.onEmailSubmit(this.state);
  };

  render() {
    return (
      <div>
        <div
          class="modal fade"
          id="resetPassModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Reset Password
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeResetPassBox"
                ></button>
              </div>
              <div class="modal-body">
                <div class="card w-100" style={{ width: 18 + "rem" }}>
                  <div class="card-body" style={{ backgroundColor: "bisque" }}>
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
                              id="ResetPassEmail"
                              placeholder=" Enter your valid email id "
                              value={this.state.email}
                              onChange={(e) =>
                                this.setState({ email: e.target.value })
                              }
                              disabled={this.context.disableEmail}
                              required
                            />
                          </div>
                          <br />
                          <div>
                            <button
                              id="ResetPassSubmit"
                              type="submit"
                              class="btn btn-primary"
                              disabled={this.context.disableEmail}
                            >
                              submit
                            </button>
                          </div>
                        </form>
                        <div
                          id="ResetPassPasswordSetter"
                          style={{ display: "none" }}
                        >
                          <PasswordSetter></PasswordSetter>
                        </div>

                        <div id="ResetPassOTPBox" style={{ display: "none" }}>
                          <OTPBox
                            onResend={this.onResend}
                            onChangeEmail={this.onChangeEmail}
                          ></OTPBox>
                        </div>
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

export default ResetPass;
