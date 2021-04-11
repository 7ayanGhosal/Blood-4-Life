import React from "react";
import axios from "axios";
import Navbar from "./components/navbar/navbar";

import AuthContext from "./context/auth-context";

class App extends React.Component {
  static contextType = AuthContext;
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
      address: "",
      bloodGroup: "",
      rhFactor: "",
      isHospital: false,
      reqDonor: false,
      authenticated: false,
    };

    //CHANGE EMAIL (Changes the state)
    this.enableEmail = () => {
      this.setState({ displayOTPBox: false, disableEmail: false });
    };
    //EMAIL VERIFICATION (Email has email, isHospital)
    this.onEmailSubmit = (Email) => {
      if (Email.boxName == "SignupBox") {
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
      } else if (Email.boxName == "ResetPassBox") {
        const body = { email: Email.email };

        axios.post("/resetPass/sendOTP", body).then(
          (res) => {
            if (res.data === "doesnotexist") {
              document.getElementById("ResetPassOTPBox").style.display =
                "block";
              document.getElementById("ResetPassOTPBox").innerHTML =
                "<h5 className='text-danger'>This Email Id doesn't exist</h5>";
            } else if (res.data === true) {
              //otp sent
              //start timer, show otp box

              this.context.resetPassEmail = Email.email;
              document.getElementById("ResetPassPasswordSetter").style.display =
                "block";
              document.getElementById("ResetPassEmail").disabled = "true";
              document.getElementById("ResetPassSubmit").disabled = "true";
            } else {
              //error in nodemailer
              document.getElementById("ResetPassOTPBox").style.display =
                "block";
              document.getElementById("ResetPassOTPBox").innerHTML =
                "<h5 className='text-danger'>Couldn't connect to server, please try again after sometime</h5>";
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
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
    //PROFILE RESET
    this.resetProfile = (profile) => {
      axios.post("/resetprofile", profile).then((res) => {
        if (!res.data) {
          console.log("ERROR IN CHANGING VALUE!!");
        } else {
          this.setState({ ...profile });
          document.getElementById("closeProfileResetterModal").click();
        }
      });
    };
    //LOGIN ROUTE
    this.checkLogin = (cred) => {
      axios.post("/login", cred).then((res) => {
        if (!res.data) {
          document.getElementById("loginMessage").innerHTML =
            "<h5 className='text-danger'>Incorrect Details!</h5>";
        } else {
          // document.getElementById("loginMessage").innerHTML =
          //   "<h5 className='text-danger'>Logging In...</h5>";
          document.getElementById("closeLoginModal").click();
          this.setState({ authenticated: true, ...res.data });
        }
      });
    };
    //LOGGING OUT USER
    this.logout = () => {
      this.setState({
        displayOTPBox: false,
        disableEmail: false,
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        gender: "",
        age: "",
        address: "",
        bloodGroup: "",
        rhFactor: "",
        isHospital: false,
        reqDonor: "",
        authenticated: false,
      });
    };
    //Passsword Reset Route
    this.checkResetPassword = (pass) => {
      this.context.resetPassPassword = pass;
      document.getElementById("ResetPassOTPBox").style.display = "block";
      document.getElementById("ResetPassPasswordSetter").style.display = "none";
    };
    this.resetPassword = (OTP) => {
      const body = {
        email: this.context.resetPassEmail,
        password: this.context.resetPassPassword,
        otp: OTP.otp,
      };
      axios.post("/resetPass/otpVerification", body).then(
        (res) => {
          if (res.data === "InvalidOTP") {
            //Wrong OTP
            document.getElementById("ResetPassOTPBoxMessage").innerText =
              "Invalid OTP!!!";
          } else {
            //correct OTP
            //this.setState({ displayOTPBox: false, disableEmail: false });
            document.getElementById("closeResetPassBox").click();
            this.setState({ authenticated: true, ...res.data });
          }
        },
        (error) => {
          console.log("ERROR IN OTP ONSUBMIT, App.js" + error);
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
            checkLogin: this.checkLogin,
            logout: this.logout,
            resetProfile: this.resetProfile,
            checkResetPassword: this.checkResetPassword,
            resetPassword: this.resetPassword,
          }}
        >
          <Navbar></Navbar>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
