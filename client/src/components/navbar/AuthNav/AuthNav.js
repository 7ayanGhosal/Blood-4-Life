import React, { Component } from "react";
import "./AuthNav.css";
import logo from "../../../resources/logo.jpeg";
import AuthContext from "../../../context/auth-context";

class AuthNav extends Component {
  constructor(props) {
    super(props);
  }
  static contextType = AuthContext;
  render() {
    return (
      <div>
        <nav class="navbar navbar-dark navbar-expand-md p-0 nav1">
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
                <div class="nav-item auth-nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-5 ps-5 icons2"
                    onClick={() => this.context.pageHandler("Emergency")}
                  >
                    {this.context.isHospital ? (
                      <b>Request Blood</b>
                    ) : (
                      <b>Emergency</b>
                    )}
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-5 ps-5 icons2"
                    onClick={() => this.context.pageHandler("Home")}
                  >
                    Home
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
                    onClick={() => this.context.pageHandler("About Us")}
                  >
                    About Us
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
                    onClick={() => this.context.pageHandler("Contact Us")}
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
                    onClick={() => this.context.pageHandler("Profile")}
                  >
                    Profile
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
                    onClick={this.context.logout}
                  >
                    Logout
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

export default AuthNav;
