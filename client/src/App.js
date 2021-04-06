import React from "react";
import axios from "axios";
import Navbar from "./components/navbar/navbar";
import LoginBox from "./components/loginBox/loginBox";
import SignupBox from "./components/signupBox/signupBox";
import ProfileModal from "./components/profleModal/profileModal";
import PasswordSetter from "./components/passwordSetter/passwordSetter";
import ProfileSetterModal from "./components/profileSetter/profileSetter";
import AuthContext from "./context/auth-context";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOTPBox: false,
      disableEmail: false,
      firstName: "",
      lastName: "",
      email: "",
      pass: "",
      gender: "",
      age: "",
      bloodGroup: "",
      rhFactor: "",
      isHospital: false,
      reqDonor: "",
      authenticated: false,
    };

    //CHANGE EMAIL (Changes the state)
    this.enableEmail = () => {
      this.setState({ displayOTPBox: false, disableEmail: false });
    };
    //EMAIL VERIFICATION (Email has email, isHospital)
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

            this.setState({
              displayOTPBox: "true",
              disableEmail: true,
              // email: Email.email,
              // isHospital: Email.isHospital,
            });
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
            //turn off signupbox
            document.getElementById("closeSignupBox").click();
            //turn on passwordSetter
            document.getElementById("passwordSetterModalButton").click();
          }
        },
        (error) => {
          console.log("ERROR IN OTP ONSUBMIT, App.js");
        }
      );
    };
    //password matching
    this.setPassword = (pass) => {
      this.setState({ pass: pass });
      //same passwords
      //turn off passwordSetter
      document.getElementById("closePasswordBox").click();
      //turn on profileSetter
      document.getElementById("profileSetterModalButton").click();
    };
    //profileSetter
    this.setProfile = async (profile) => {
      await this.setState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,
        age: profile.age,
        bloodGroup: profile.bloodGroup,
        rhFactor: profile.rhFactor,
        reqDonor: profile.reqDonor,
      });
      axios.post("/signup", this.state).then(
        (res) => {
          console.log("app.js: user details posted");
        },
        (error) => {
          console.log("app.js: Error in /signup" + error);
        }
      );
    };
  }
  render() {
    return (
      <div>
        <AuthContext.Provider value={this.state}>
          <Navbar></Navbar>
        </AuthContext.Provider>
        <SignupBox
          onEmailSubmit={this.onEmailSubmit}
          onOTPSubmit={this.onOTPSubmit}
          displayOTPBox={this.state.displayOTPBox}
          disableEmail={this.state.disableEmail}
          enableEmail={this.enableEmail}
        ></SignupBox>
        <PasswordSetter getPassword={this.setPassword}></PasswordSetter>
        <ProfileSetterModal setProfile={this.setProfile}></ProfileSetterModal>
        <LoginBox></LoginBox>
        <ProfileModal></ProfileModal>
      </div>
    );
  }
}

export default App;
