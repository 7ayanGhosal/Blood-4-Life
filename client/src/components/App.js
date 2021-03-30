import React from "react";
import Navbar from "./navbar/navbar";
import LoginBox from "./loginBox/loginBox";
import SignupBox from "./signupBox/signupBox";
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

    this.box = null;
  }
  render() {
    if (this.state.displayBox === "loginBox") this.box = <LoginBox></LoginBox>;
    else if (this.state.displayBox === "signupBox")
      this.box = <SignupBox></SignupBox>;

    return (
      <div>
        <Navbar
          onDisplay={this.onDisplayHandler}
          offDisplay={this.offDisplayHandler}
        ></Navbar>
        {this.box}
        {/* <AccountDetails></AccountDetails> */}
        {/* <SetPassword></SetPassword> */}
      </div>
    );
  }
}

export default App;
