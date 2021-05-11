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
        <nav class="navbar navbar-dark navbar-expand-lg p-0 nav1">
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
                <div class="auth-nav-item">
                  <button
                    type="button"
                    class="btn navbar-custom text-align-center pe-5 ps-5 icons2 glow"
                    onClick={() => this.context.pageHandler("Emergency")}
                  >
                    {this.context.isHospital ? (
                      <b>Request Blood</b>
                    ) : (
                      <b>Need Blood?</b>
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
                <div class="dropdown">
                  <button
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2 dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Options
                  </button>
                  <ul
                    class="dropdown-menu nav-drop"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {this.context.isHospital ? (
                      <div>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.displayHandler("BloodBank");
                            }}
                          >
                            <h5 class="drop-head">Blood Bank Counter</h5>
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.displayHandler("UpcomingEvents");
                            }}
                          >
                            <h5 class="drop-head">
                              Upcoming Blood Donation Camps
                            </h5>
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.displayHandler("OrganiseCamp");
                            }}
                          >
                            <h5 class="drop-head">
                              Organise a Blood Donation Camp
                            </h5>
                          </button>
                        </li>
                      </div>
                    ) : (
                      <div>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.displayHandler("UpcomingEvents");
                            }}
                          >
                            <h5 class="drop-head">
                              Upcoming Blood Donation Camps Near You
                            </h5>
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.displayHandler("Notifications");
                            }}
                          >
                            <h5 class="drop-head">Notifications</h5>
                          </button>
                        </li>
                      </div>
                    )}
                  </ul>
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
