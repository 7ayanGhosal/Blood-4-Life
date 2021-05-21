import React, { Component } from "react";
import "./AuthNav.css";
import logo from "../../../resources/logo.png";
import AuthContext from "../../../context/auth-context";
import HospProfile from "../../hospital/profile/profile";
import UserProfile from "../../user/profile/profile";
import HospitalAvatar2 from "../../../resources/HospitalAvatar2.jpg";
import MaleAvatar from "../../../resources/MaleAvatar.jpg";
import FemaleAvatar from "../../../resources/FemaleAvatar.jpg";
import MaleAvatar2 from "../../../resources/MaleAvatar2.jpg";
import FemaleAvatar2 from "../../../resources/FemaleAvatar2.jpg";
import MaleAvatar3 from "../../../resources/MaleAvatar3.jpg";
import FemaleAvatar3 from "../../../resources/FemaleAvatar3.jpg";
import MaleAvatar4 from "../../../resources/MaleAvatar4.jpg";
import FemaleAvatar4 from "../../../resources/FemaleAvatar4.jpg";

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
                    class="btn navbar-custom text-align-center pe-4 ps-4 icons2 glow"
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
                  {this.context.isHospital === true ||
                  this.context.avatar !== 5 ? (
                    <img
                      id="avatar"
                      src={
                        this.context.isHospital
                          ? HospitalAvatar2
                          : this.context.gender === "Male"
                          ? this.context.avatar === 1
                            ? MaleAvatar
                            : this.context.avatar === 2
                            ? MaleAvatar2
                            : this.context.avatar === 3
                            ? MaleAvatar3
                            : this.context.avatar === 4
                            ? MaleAvatar4
                            : null
                          : this.context.avatar === 1
                          ? FemaleAvatar
                          : this.context.avatar === 2
                          ? FemaleAvatar2
                          : this.context.avatar === 3
                          ? FemaleAvatar3
                          : this.context.avatar === 4
                          ? FemaleAvatar4
                          : null
                      }
                      class="profile-avatar"
                      alt="..."
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasWithBothOptions"
                      aria-controls="offcanvasWithBothOptions"
                    />
                  ) : (
                    <div class="profile-avatar profile-avatar-5">
                      <div
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBothOptions"
                        aria-controls="offcanvasWithBothOptions"
                      >
                        {this.context.firstName[0]}
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    class="btn navp navbar-custom text-align-center pe-4 ps-4 icons2"
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
                    class="btn navl avbar-custom text-align-center pe-4 ps-4 icons2"
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
