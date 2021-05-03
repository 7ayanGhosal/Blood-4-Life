import React, { Component } from "react";
import "./OTPBox.css";
import AuthContext from "../../../../../context/auth-context";

class OTPBox extends Component {
  state = {
    otp: "10000",
    boxName: "SignupBox",
  };
  static contextType = AuthContext;

  onFormSubmit = (event) => {
    event.preventDefault();
    this.context.onOTPSubmit(this.state);
  };
  reset = () => {
    this.setState({
      otp: "10000",
      boxName: "SignupBox",
    });
    this.context.remove();
  };
  render() {
    return (
      <div class="OTPBox">
        <br />

        <br />
        {/*<div class="settimer">
          <h4 class="timer">60 sec </h4>
    </div>*/}
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
            onClick={() => this.context.enableEmail()}
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
      </div>
    );
  }
}

export default OTPBox;
