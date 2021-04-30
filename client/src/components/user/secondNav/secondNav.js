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
                <li class="nav-item1" id="UpcomingEvents">
                  <h5
                    class="nav-link"
                    onClick={() => {
                      this.props.displayHandler("UpcomingEvents");
                    }}
                  >
                    Upcoming Blood Donation Camps Near You
                  </h5>
                </li>
                <li class="nav-item1" id="Notifications">
                  <h5
                    class="nav-link"
                    onClick={() => {
                      this.props.displayHandler("Notifications");
                    }}
                  >
                    Notifications
                  </h5>
                </li>
                <li class="nav-item1 Active" id="Profile">
                  <h5
                    class="nav-link"
                    onClick={() => {
                      this.props.displayHandler("Profile");
                    }}
                  >
                    Profile Details
                  </h5>
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
