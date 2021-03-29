import React, { Component } from "react";
import classes from "./navbar.css";

class Navbar extends Component {
  render() {
    return (
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
        <a href="#login">log in</a>
      </div>
    );
  }
}

export default Navbar;
