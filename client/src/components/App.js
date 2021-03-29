import React from "react";
import Navbar from "./navbar/navbar";
import LoginBox from "./loginBox/loginBox";
import SignupBox from "./signupBox/signupBox";
class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <LoginBox></LoginBox>
        <SignupBox></SignupBox>
      </div>
    );
  }
}

export default App;
