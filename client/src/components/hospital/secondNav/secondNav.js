import React, { Component } from "react";
import "./secondNav.css";

class SecondNav extends Component {
  BloodBankDisplayHandler = () => {
    this.props.displayHandler("BloodBank");
  };
  ProfileDisplayHnadler = () => {
    this.props.displayHandler("Profile");
  };
  UpcomingEventsDisplayHandler = () => {
    this.props.displayHandler("UpcomingEvents");
  };
  OrganiseCampDisplayHandler = () => {
    this.props.displayHandler("OrganiseCamp");
  };
  render() {
    return (
      <div class="topnav">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item1">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    onClick={this.BloodBankDisplayHandler}
                  >
                    Blood Bank Counter
                  </a>
                </li>
                <li class="nav-item1">
                  <a
                    class="nav-link"
                    onClick={this.UpcomingEventsDisplayHandler}
                  >
                    Upcoming Blood Donation Camps
                  </a>
                </li>
                <li class="nav-item1">
                  <a class="nav-link" onClick={this.OrganiseCampDisplayHandler}>
                    Organise a Blood Donation Camp
                  </a>
                </li>
                <li class="nav-item1">
                  <a class="nav-link" onClick={this.ProfileDisplayHnadler}>
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default SecondNav;
