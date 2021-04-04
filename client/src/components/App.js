import React from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import LoginBox from "./loginBox/loginBox";
import SignupBox from "./signupBox/signupBox";
import ProfileModal from "./profleModal/profileModal";
import SetPassword from "./setPassword/setPassword";
import AccountDetails from "./accountDetails/accountDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayOTPBox: false };

    //EMAIL VERIFICATION
    this.onEmailSubmit = (Email) => {
      const body = { email: Email.email };
      axios.post("/emailVerification", body).then(
        (res) => {
          if (res.data === "Exists") {
            //Already exists
            this.setState({ displayOTPBox: "exists" });
          } else if (res.data === "False") {
            //error in nodemailer
            this.setState({ displayOTPBox: "false" });
          } else {
            //otp sent
            //start timer, show otp box
            this.setState({ displayOTPBox: "true" });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    };

    //OTP VERIFICATION
    this.onOTPSubmit = (OTP) => {
      console.log(typeof OTP.otp);
      const body = { otp: OTP.otp };
      axios.post("/otpVerification", body).then(
        (res) => {
          if (res.data === "False") {
            //Wrong OTP
            res.send("INVALID OTP");
          } else {
            //correct OTP
            res.send("VALID OTP");
          }
        },
        (error) => {
          console.log("ERROR IN OTP ONSUBMIT, App.js");
        }
      );
    };
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <SignupBox
          onEmailSubmit={this.onEmailSubmit}
          onOTPSubmit={this.onOTPSubmit}
          displayOTPBox={this.state.displayOTPBox}
        ></SignupBox>
        <LoginBox></LoginBox>
        <ProfileModal></ProfileModal>
      </div>
    );
  }
}

export default App;

// this.box = null;
// if (this.state.displayBox === "loginBox") this.box = <LoginBox></LoginBox>;
// else if (this.state.displayBox === "signupBox")
//   this.box = <SignupBox onEmailSubmit={this.onEmailSubmit}></SignupBox>;
// else this.box = null;
{
  /* <Navbar
  onDisplay={this.onDisplayHandler}
  offDisplay={this.offDisplayHandler}
  ></Navbar>
{this.box} */
}
{
  /* <SetPassword></SetPassword> */
}
{
  /* <AccountDetails></AccountDetails> */
}
{
  /* <button onClick={this.offDisplayHandler}>Close box</button> */
}
