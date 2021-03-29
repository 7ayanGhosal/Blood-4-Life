import React, { Component } from "react";
import classes from "./navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <div class="topnav">
          <a class="active" href="#home">
            Home
          </a>
          <a class="emergency" href="#emergency">
            <b>Emergency</b>
          </a>
          <a href="#about">About us</a>
          <a href="#contact">Contact us</a>
          <a href="#signup">Sign Up</a>
          <a href="#login" onClick={this.props.toggleLogin}>
            log in
          </a>
        </div>
        <div class="topnav">
          <a class="active" href="#home">
            Home
          </a>
          <a class="emergency" href="#emergency">
            <b>Emergency</b>
          </a>
          <a href="#about">About us</a>
          <a href="#contact">Contact us</a>
          <a onclick="openNav()">Profile</a>
          <a href="#logout">log out</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
