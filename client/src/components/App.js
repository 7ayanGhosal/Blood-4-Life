import React from "react";
import Navbar from "./navbar/navbar";
import LoginBox from "./loginBox/loginBox";
class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <LoginBox></LoginBox>
      </div>
    );
  }
}

export default App;
