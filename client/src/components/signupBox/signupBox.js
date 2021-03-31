import React, { Component } from "react";
import "./signupBox.css";

class SignupBox extends Component {
  state = { email: "", isHospital: false };
  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onEmailSubmit(this.state);
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
    return (
      <div>
        <div className="centerbox">
          <center>
            <div>
              <form onSubmit={this.onFormSubmit}>
                <label>Email :</label>
                <input
                  id="text1"
                  placeholder=" Enter your valid email id "
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                ></input>
                <br></br>
                <br></br>
                <input
                  type="radio"
                  value="person"
                  name="accountType"
                  // checked="checked"
                  onChange={this.onTypePerson}
                ></input>
                <br></br>
                <input
                  type="radio"
                  value="Hospital"
                  name="accountType"
                  onChange={this.onTypeHospital}
                ></input>
                <br></br>
                <button className="submit" type="submit">
                  {" "}
                  submit
                </button>
                <br></br>
              </form>
            </div>

            <div className="buttons">
              <button className="changemail">change email id</button>
              <div className="settimer">
                <h4 className="timer">60 sec </h4>
              </div>
              <input type="text" placeholder="enter your OTP"></input>
              <button className="verify">verify</button>
              <button className="resend">resend</button>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default SignupBox;
