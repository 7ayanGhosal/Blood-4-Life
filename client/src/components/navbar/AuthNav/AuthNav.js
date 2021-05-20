import React, { Component } from "react";
import "./AuthNav.css";
import logo from "../../../resources/logo.png";
import AuthContext from "../../../context/auth-context";
import HospProfile from "../../hospital/profile/profile";
import UserProfile from "../../user/profile/profile";

class AuthNav extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <div>
        <nav class="navbar navbar-dark navbar-expand-lg p-0 nav1">
          <div class="container-fluid">
            <div class="logo">
              <img src={logo} alt="mainLogoAuthNav"></img>
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
                    class="btn navbar-custom text-align-center pe-4 ps-5 icons2 glow"
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
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2"
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
                <div class="dropdown nav-item">
                  <button
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2 dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
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
                              this.context.pageHandler("BloodBank");
                            }}
                          >
                            <h5 class="drop-head">Blood Bank</h5>
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.pageHandler(
                                "HospitalUpcomingEvents"
                              );
                            }}
                          >
                            <h5 class="drop-head">My Blood Donation Camps</h5>
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.pageHandler("OrganiseCamp");
                            }}
                          >
                            <h5 class="drop-head">
                              Organise A Blood Donation Camp
                            </h5>
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.pageHandler("Contact Us");
                            }}
                          >
                            <h5 class="drop-head">Contact Us</h5>
                          </button>
                        </li>
                      </div>
                    ) : (
                      <div>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.pageHandler("UserUpcomingEvents");
                            }}
                          >
                            <h5 class="drop-head">Nearby Camps</h5>
                          </button>
                        </li>
                        {/* <hr class="hr-stle"></hr> */}
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.pageHandler("Notifications");
                            }}
                          >
                            <h5 class="drop-head">Notifications</h5>
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            onClick={() => {
                              this.context.pageHandler("Contact Us");
                            }}
                          >
                            <h5 class="drop-head">Contact Us</h5>
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
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
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

        {this.context.isHospital ? (
          <HospProfile></HospProfile>
        ) : (
          <UserProfile></UserProfile>
        )}
      </div>
    );
  }
}

export default AuthNav;
