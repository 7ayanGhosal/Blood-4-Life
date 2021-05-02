import React, { Component } from "react";
import "./unAuthNav.css";
import SignupBox from "./signupBox/signupBox";
import logo from "../../../resources/logo.jpeg";
import PasswordSetter from "./passwordSetter/passwordSetter";
import ProfileSetter from "./profileSetter/profileSetter";
import LoginBox from "./loginBox/loginBox";
import AuthContext from "../../../context/auth-context";
import PlacePicker from "./placePicker/placePicker";

class UnAuthNav extends Component {
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
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-5 ps-5 icons2"
                    onClick={() => this.context.pageHandler("Emergency")}
                  >
                    Emergency
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
                    id="openLoginModal"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                </div>
                <div class="nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                    // onClick={this.onSignupDisplay}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <LoginBox></LoginBox>
        <SignupBox></SignupBox>
        <PasswordSetter></PasswordSetter>
        <ProfileSetter></ProfileSetter>
        <PlacePicker></PlacePicker>
      </div>
    );
  }
}

export default UnAuthNav;
