import React from "react";
import Navbar from "./navbar/navbar";
import LoginBox from "./loginBox/loginBox";
import SignupBox from "./signupBox/signupBox";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayLoginBox: false };
    this.toggleLoginDisplayHandler = () => {
      this.setState({ displayLoginBox: !this.state.displayLoginBox });
    };
  }
  render() {
    //LOGIN BOX
    this.loginBox = null;
    if (this.state.displayLoginBox) {
      this.loginBox = <LoginBox></LoginBox>;
    }

    return (
      <div>
        <Navbar toggleLogin={this.toggleLoginDisplayHandler}></Navbar>
        {this.loginBox}
        <SignupBox></SignupBox>
      </div>
    );
  }
}

export default App;
