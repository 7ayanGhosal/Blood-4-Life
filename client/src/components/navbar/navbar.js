import React, { Component } from "react";
import "./navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onSignupDisplay = () => {
      this.props.onDisplay("signupBox");
    };
    this.onLoginDisplay = () => {
      this.props.onDisplay("loginBox");
    };
  }
  render() {
    return (
      <div>
        <div className="topnav">
          <a className="active" href="#home">
            Home
          </a>
          <a className="emergency" href="#emergency">
            <b>Emergency</b>
          </a>
          <a href="#about">About us</a>
          <a href="#contact">Contact us</a>
          <a href="#" onClick={this.onSignupDisplay}>
            Sign Up
          </a>
          <a href="#" onClick={this.onLoginDisplay}>
            log in
          </a>
        </div>
        <div className="topnav">
          <a className="active" href="#home">
            Home
          </a>
          <a className="emergency" href="#emergency">
            <b>Emergency</b>
          </a>
          <a href="#about">About us</a>
          <a href="#contact">Contact us</a>
          <a href="#" /*onClick="openNav()"*/>Profile</a>
          <a href="#logout">log out</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
