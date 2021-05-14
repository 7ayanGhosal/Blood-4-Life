import React, { Component } from "react";
import axios from "axios";
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
    document.getElementById("ResetPassInp1").value = "";
    document.getElementById("ResetPassInp2").value = "";
  };
  onResend = () => {
    // this.context.onEmailSubmit(this.state);
    const body = { email: this.state.email };
    axios.post("/resetPass/sendOTP", body);
  };
  close = () => {
    document.getElementById("ResetPassOTPBox").style.display = "none";
    document.getElementById("ResetPassPasswordSetter").style.display = "none";
    // this.setState = { email: "" };
    document.getElementById("ResetPassMessage").innerHTML = "";
    // document.getElementById("ResetPassInp1").value = "";
    // document.getElementById("ResetPassInp2").value = "";
    document.getElementById("ResetPassEmail").disabled = false;
    document.getElementById("ResetPassSubmit").disabled = false;
  };
  reset = () => {
    this.setState({ email: "", boxName: "ResetPassBox" });
    this.context.remove();
  };
  resetSetter = (func) => {
    func();
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
              <button
                type="button"
                class="btn-close modal-close-button"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeResetPassBox"
                onClick={this.close}
              ></button>
              <div class="modal-body">
                <h3 class="modal-title reseth" id="exampleModalLabel">
                  Reset Password
                </h3>
                <div class="card w-100 rp-box-bg" style={{ width: 18 + "rem" }}>
                  <div class="card-body">
                    <p class="card-text">
                      <center>
                        <br />
                        <form onSubmit={this.onFormSubmit}>
                          <div class="inputtext">
                            <h5 class="field-label">
                              Email :&emsp;{" "}
                              <input
                                class="modal-input form-control"
                                type="email"
                                id="ResetPassEmail"
                                placeholder=" Enter your valid Email Id "
                                value={this.state.email}
                                onChange={(e) => {
                                  this.setState({ email: e.target.value });
                                  document.getElementById(
                                    "ResetPassMessage"
                                  ).innerHTML = "";
                                }}
                                required
                              />
                            </h5>
                          </div>
                          <br />
                          <hr class="style-six"></hr>
                          <div>
                            <button
                              id="ResetPassSubmit"
                              type="submit"
                              class="btn btn-primary"
                            >
                              Submit
                            </button>
                            <div id="ResetPassMessage"></div>
                          </div>
                        </form>
                        <div
                          id="ResetPassPasswordSetter"
                          style={{ display: "none" }}
                        >
                          <PasswordSetter
                            key={this.state.email}
                            resetSetter={this.resetSetter}
                          ></PasswordSetter>
                        </div>

                        <div id="ResetPassOTPBox" style={{ display: "none" }}>
                          <OTPBox
                            key={this.state.email + "2"}
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
