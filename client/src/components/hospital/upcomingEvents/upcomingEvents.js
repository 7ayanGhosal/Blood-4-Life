import React, { Component } from "react";
import "./upcomingEvents.css";
import AuthContext from "../../../context/auth-context";

class Events extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <div class="container">
        <center>
          <br />
          <h3>Upcoming Blood Donation Camps</h3>
          <br />
          <br />
          <div class="card ue">
            <div class="card-body">
              <h3 class="attribute" href="#">
                Date :-{" "}
              </h3>
              &ensp;
              <h3 class="value">01.05.21</h3>
              <br />
              <h3 class="attribute" href="#">
                Time :-{" "}
              </h3>
              &ensp;
              <h3 class="value">2:00 pm</h3>
              <br />
              <h3 class="attribute" href="#">
                Location :-{" "}
              </h3>
              &ensp;
              <h3 class="value">kolkata</h3>
              <br />
              <h3 class="attribute" href="#">
                Details :-{" "}
              </h3>
              &ensp;
              <h3 class="value">Blood Camp</h3>
              <br />
            </div>
          </div>
          <br />
          <div class="card ue">
            <div class="card-body">
              <h3 class="attribute" href="#">
                Date :-{" "}
              </h3>
              &ensp;
              <h3 class="value">01.05.21</h3>
              <br />
              <h3 class="attribute" href="#">
                Time :-{" "}
              </h3>
              &ensp;
              <h3 class="value">2:00 pm</h3>
              <br />
              <h3 class="attribute" href="#">
                Location :-{" "}
              </h3>
              &ensp;
              <h3 class="value">kolkata</h3>
              <br />
              <h3 class="attribute" href="#">
                Details :-{" "}
              </h3>
              &ensp;
              <h3 class="value">Blood Camp</h3>
              <br />
            </div>
          </div>
          <br />
          <div class="card ue">
            <div class="card-body">
              <h3 class="attribute" href="#">
                Date :-{" "}
              </h3>
              &ensp;
              <h3 class="value">01.05.21</h3>
              <br />
              <h3 class="attribute" href="#">
                Time :-{" "}
              </h3>
              &ensp;
              <h3 class="value">2:00 pm</h3>
              <br />
              <h3 class="attribute" href="#">
                Location :-{" "}
              </h3>
              &ensp;
              <h3 class="value">kolkata</h3>
              <br />
              <h3 class="attribute" href="#">
                Details :-{" "}
              </h3>
              &ensp;
              <h3 class="value">Blood Camp</h3>
              <br />
            </div>
          </div>
          <br />
        </center>
      </div>
    );
  }
}

export default Events;
