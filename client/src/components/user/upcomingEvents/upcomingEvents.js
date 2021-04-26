import React, { Component } from "react";
import "./upcomingEvents.css";
import AuthContext from "../../../context/auth-context";

class Events extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <div class="container">
        <center>
          <h1>Upcoming Blood Donation Camps</h1>
          <nav id="navbar-example2" class="navbar navbar-light bg-light px-3">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" href="#camp1">
                  Camp 1
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#camp2">
                  Camp 2
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#camp3">
                  Camp 3
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#camp4">
                  Camp 4
                </a>
              </li>
            </ul>
          </nav>
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example2"
            data-bs-offset="0"
            tabindex="0"
          >
            <h4 id="camp1">Camp 1</h4>
            <p>...</p>
            <h4 id="camp2">Camp 2</h4>
            <p>...</p>
            <h4 id="camp3">Camp 3</h4>
            <p>...</p>
            <h4 id="camp4">Camp 4</h4>
            <p>...</p>
          </div>
        </center>
      </div>
    );
  }
}

export default Events;
