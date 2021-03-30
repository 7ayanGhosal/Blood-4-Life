import React, { Component } from "react";
import "./signupBox.css";

class SignupBox extends Component {
  render() {
    return (
      <div>
        <div className="centerbox">
          <center>
            <div>
              <form>
                <label>Email :</label>
                <input
                  id="text1"
                  placeholder=" Enter your valid email id "
                ></input>
                <br></br>
                <br></br>
                <input type="radio" value="person"></input>
                <br></br>
                <input type="radio" value="Hospital"></input>
                <br></br>
              </form>
            </div>

            <br></br>
            <div className="buttons">
              <button className="submit"> submit</button>
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
