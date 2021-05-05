import React, { Component } from "react";
import "./upcomingEvents.css";
import AuthContext from "../../../context/auth-context";

class Events extends Component {
  static contextType = AuthContext;
  render() {
    var events = [];
    for (var i = 0; i < this.context.events.length; i++) {
      events.push(
        <div>
          <div class="card ue">
            <div class="card-body">
              <h3 class="ue-attribute" href="#">
                Name :-
              </h3>
              &ensp;
              <h3 class="ue-value">{this.context.events[i].eventName}</h3>
              <br />
              <br />
              <h3 class="ue-attribute" href="#">
                Date :-
              </h3>
              &ensp;
              <h3 class="ue-value">{this.context.events[i].eventDate}</h3>
              <br />
              <br />
              <h3 class="ue-attribute" href="#">
                Time :-
              </h3>
              &ensp;
              <h3 class="ue-value">
                {this.context.events[i].eventStartTime} To{" "}
                {this.context.events[i].eventEndTime}
              </h3>
              <br />
              <br />
              <h3 class="ue-attribute" href="#">
                Contact :-
              </h3>
              &ensp;
              <h3 class="ue-value">{this.context.events[i].email}</h3>
              <br />
              <br />
              <h3 class="ue-attribute" href="#">
                Location :-{" "}
              </h3>
              &ensp;
              <h3 class="ue-value">
                {this.context.events[i].location.poi +
                  ", " +
                  this.context.events[i].location.street +
                  ", " +
                  this.context.events[i].location.subSubLocality +
                  ", " +
                  this.context.events[i].location.subLocality +
                  ", " +
                  this.context.events[i].location.locality +
                  ", " +
                  this.context.events[i].location.village +
                  ", " +
                  this.context.events[i].location.district +
                  ", " +
                  this.context.events[i].location.subDistrict +
                  ", " +
                  this.context.events[i].location.city +
                  ", " +
                  this.context.events[i].location.state +
                  ", " +
                  this.context.events[i].location.pincode}
              </h3>
              <br />
              <br />
              <h3 class="ue-attribute" href="#">
                Description :-{" "}
              </h3>
              &ensp;
              <h3 class="ue-value">
                {this.context.events[i].eventDescription}
              </h3>
              <br />
              <br />
            </div>
          </div>
          <br />
        </div>
      );
    }
    return (
      <div class="container">
        <center>
          <br />
          <h3>Upcoming Blood Donation Camps</h3>
          <br />
          <br />
          {events}
        </center>
      </div>
    );
  }
}

export default Events;
