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
        <button
          class="btn btn-secondary"
          onClick={() => this.context.enableEmail()}
        >
          Change email id
        </button>
        <br />
        <div class="settimer">
          <h4 class="timer">60 sec </h4>
        </div>
        <form onSubmit={this.onFormSubmit}>
          <input
            class="otpverify"
            type="number"
            name="OTP"
            onChange={(event) => {
              this.setState({ otp: event.target.value });
            }}
            value={this.state.otp}
            min="10000"
            max="99999"
          />
          &ensp;
          <button class="btn btn-success otpverify" type="submit">
            Verify
          </button>
          <br />
        </form>
        <br />
        <button class="btn btn-danger" onClick={() => this.props.onResend()}>
          Resend
        </button>
      </div>
    );
  }
}

export default OTPBox;
