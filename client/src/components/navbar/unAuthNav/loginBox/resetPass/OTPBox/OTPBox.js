import React, { Component } from "react";
import "./OTPBox.css";
import AuthContext from "../../../../../../context/auth-context";

class OTPBox extends Component {
  state = {
    otp: "10000",
    boxName: "ResetPassBox",
  };
  static contextType = AuthContext;

  onFormSubmit = (event) => {
    event.preventDefault();
    this.context.resetPassword(this.state);
  };
  reset = () => {
    this.setState({
      otp: "10000",
      boxName: "ResetPassBox",
    });
    this.context.remove();
  };
  render() {
    return (
      <div class="OTPBox">
        {/*<div class="settimer">
          <h4 class="timer">60 sec </h4>
        </div>*/}
        <br />
        <form onSubmit={this.onFormSubmit}>
          <div class="form-group-row">
            <h5>
              Enter OTP :&emsp;
              <input
                class="otp form-control otp-modal-input"
                type="number"
                name="OTP"
                onChange={(event) => {
                  this.setState({ otp: event.target.value });
                  document.getElementById("ResetPassOTPBoxMessage").innerText =
                    "";
                }}
                value={this.state.otp}
                min="10000"
                max="99999"
              />
            </h5>
          </div>
          <br />
          <button
            class="btn btn-secondary email-change otp-btn"
            onClick={() => {
              this.props.onChangeEmail();
            }}
          >
            Change Email Id
          </button>
          <button class="btn btn-success otpverify otp-btn" type="submit">
            Verify
          </button>
        </form>
        <button
          class="btn btn-danger otpresend otp-btn"
          onClick={() => this.props.onResend()}
        >
          Resend
        </button>
        <h3 id="ResetPassOTPBoxMessage"></h3>
      </div>
    );
  }
}

export default OTPBox;
