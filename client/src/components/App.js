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
    this.state = { displayBox: "" };
    this.onDisplayHandler = (boxId) => {
      this.setState({ displayBox: boxId });
    };
    this.offDisplayHandler = () => {
      this.setState({ displayBox: "" });
    };
    this.onEmailSubmit = (Email) => {
      const body = {
        email: Email.email,
      };
      axios.post("/emailVerification", body).then(
        (response) => {
          console.log(/*"from appJs:" +*/ response);
        },
        (error) => {
          console.log(error);
        }
      );

      console.log(Email);
    };

    this.box = null;
  }
  render() {
    if (this.state.displayBox === "loginBox") this.box = <LoginBox></LoginBox>;
    else if (this.state.displayBox === "signupBox")
      this.box = <SignupBox onEmailSubmit={this.onEmailSubmit}></SignupBox>;
    else this.box = null;
    return (
      <div>
        <Navbar
          onDisplay={this.onDisplayHandler}
          offDisplay={this.offDisplayHandler}
        ></Navbar>

        <LoginBox></LoginBox>
        <SignupBox onEmailSubmit={this.onEmailSubmit}></SignupBox>

        {this.box}
        <ProfileModal></ProfileModal>
        {/* <AccountDetails></AccountDetails> */}
        {/* <SetPassword></SetPassword> */}
        <button onClick={this.offDisplayHandler}>Close box</button>
      </div>
    );
  }
}

export default App;
