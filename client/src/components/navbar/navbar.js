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
        <nav class="navbar navbar-expand-md navbar-dark bg-light p-0">
          <div class="container-fluid">
            <button
              type="button"
              class="btn btn-outline-danger navbar-custom text-align-center pe-5 ps-5"
              href="#"
            >
              Navbar
            </button>
            <button
              class="navbar-toggler"
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
                    class="btn btn-light navbar-custom text-align-center pe-5 ps-5 icons2"
                  >
                    Home
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn btn-light navbar-custom text-align-center pe-4 ps-4 icons2"
                    href="#"
                  >
                    About Us
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn btn-light navbar-custom text-align-center pe-4 ps-4 icons2"
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
                    class="btn btn-light navbar-custom text-align-center pe-4 ps-4 icons2"
                    href="#"
                    onClick={this.onLoginDisplay}
                  >
                    Login
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn btn-light navbar-custom text-align-center pe-4 ps-4 icons2"
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
      </div>
    );
  }
}

export default Navbar;
