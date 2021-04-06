import React from "react";
import axios from "axios";
import Navbar from "./components/navbar/navbar";
import LoginBox from "./components/loginBox/loginBox";
import ProfileModal from "./components/profleModal/profileModal";
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
              email: Email.email,
              isHospital: Email.isHospital,
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
      const body = { otp: OTP.otp };
      axios.post("/otpVerification", body).then(
        (res) => {
          if (res.data === "False") {
            //Wrong OTP
            console.log("INVALID OTP");
          } else {
            //correct OTP
            //turn off signupbox
            //this.setState({ displayOTPBox: false, disableEmail: false });
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
          if (res.data) {
            document.getElementById("closeProfileSetterModal").click();
            this.setState({ authenticated: true });
          } else
            console.log(
              "from App.js, there is some error in index.js(backend)"
            );
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
        <AuthContext.Provider
          value={{
            ...this.state,
            onEmailSubmit: this.onEmailSubmit,
            onOTPSubmit: this.onOTPSubmit,
            enableEmail: this.enableEmail,
            setPassword: this.setPassword,
            setProfile: this.setProfile,
          }}
        >
          <Navbar></Navbar>
        </AuthContext.Provider>

        <LoginBox></LoginBox>
        <ProfileModal></ProfileModal>
      </div>
    );
  }
}

export default App;