import React from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import LoginBox from "./loginBox/loginBox";
import SignupBox from "./signupBox/signupBox";
import SetPassword from "./setPassword/setPassword";
import AccountDetails from "./accountDetails/accountDetails";
import SideNav from "./sideNav/sideNav";

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
          console.log("from appJs:" + Email.email);
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
        <SideNav></SideNav>
        {this.box}
        {/* <AccountDetails></AccountDetails> */}
        {/* <SetPassword></SetPassword> */}
        <button onClick={this.offDisplayHandler}>Close box</button>
      </div>
    );
  }
}

export default App;
