import React, { Component } from "react";
import "./navbar.css";
import logo from "../../resources/logo.jpeg";

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
        <nav class="navbar navbar-expand-md p-0">
          <div class="container-fluid">
            <div class="logo">
              <img src={logo}></img>
              <h3>Blood4Life</h3>
            </div>
            <button
              class="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <div class="icons d-flex justify-content-center">
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-5 ps-5 icons2"
                  >
                    Home
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
                    href="#"
                  >
                    About Us
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
                    href="#"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
              <ul class="navbar-nav me-auto"></ul>
              <div class="icons d-flex justify-content-end">
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
                    href="#"
                    onClick={this.onLoginDisplay}
                  >
                    Login
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
                    href="#"
                    onClick={this.onSignupDisplay}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="topnav">
          <a className="active" href="#home">
            Home
          </a>
          <a className="emergency" href="#emergency">
            <b>Emergency</b>
          </a>
          <a href="#about">About us</a>
          <a href="#contact">Contact us</a>
          <a data-bs-toggle="modal" data-bs-target="#profileModal">
            Profile
          </a>
          <a href="#logout">log out</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
