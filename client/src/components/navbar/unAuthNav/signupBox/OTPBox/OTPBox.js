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
  render() {
    return (
      <div class="OTPBox">
        <button
          class="btn btn-primary"
          onClick={() => this.context.enableEmail()}
        >
          change email id
        </button>
        <div class="settimer">
          <h4 class="timer">60 sec </h4>
        </div>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="number"
            name="OTP"
            onChange={(event) => {
              this.setState({ otp: event.target.value });
            }}
            value={this.state.otp}
            min="10000"
            max="99999"
          />
          <button class="btn btn-primary" type="submit">
            verify
          </button>
        </form>
        <button class="btn btn-primary" onClick={() => this.props.onResend()}>
          resend
        </button>
      </div>
    );
  }
}

export default OTPBox;
