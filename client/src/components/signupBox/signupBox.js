import React, { Component } from "react";
import "./signupBox.css";

class SignupBox extends Component {
  render() {
    return (
      <div>
        <div class="centerbox">
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
            <div class="buttons">
              <button class="submit"> submit</button>
              <button class="changemail">change email id</button>
              <div class="settimer">
                <h4 class="timer">60 sec </h4>
              </div>
              <input type="text" placeholder="enter your OTP"></input>
              <button class="verify">verify</button>
              <button class="resend">resend</button>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default SignupBox;
