import React, { Component } from "react";
import "./secondNav.css";

class SecondNav extends Component {
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
                    id="BloodBank"
                    class="nav-link"
                    aria-current="page"
                    onClick={() => {
                      this.props.displayHandler("BloodBank");
                    }}
                  >
                    Blood Bank Counter
                  </a>
                </li>
                <li class="nav-item1">
                  <a
                    id="UpcomingEvents"
                    class="nav-link"
                    onClick={() => {
                      this.props.displayHandler("UpcomingEvents");
                    }}
                  >
                    Upcoming Blood Donation Camps
                  </a>
                </li>
                <li class="nav-item1">
                  <a
                    id="OrganiseCamp"
                    class="nav-link"
                    onClick={() => {
                      this.props.displayHandler("OrganiseCamp");
                    }}
                  >
                    Organise a Blood Donation Camp
                  </a>
                </li>
                <li class="nav-item1">
                  <a
                    id="Profile"
                    class="nav-link active"
                    onClick={() => {
                      this.props.displayHandler("Profile");
                    }}
                  >
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
