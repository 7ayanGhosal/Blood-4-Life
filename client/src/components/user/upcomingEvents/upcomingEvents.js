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
            <h3 class="card-header ue-cardh">
              {this.context.events[i].eventName}
            </h3>
            <div class="card-body">
              <h5 class="ue-attribute" href="#">
                Date :-
              </h5>
              &ensp;
              <h6 class="ue-value">{this.context.events[i].eventDate}</h6>
              <br />
              <h5 class="ue-attribute" href="#">
                Time :-
              </h5>
              &ensp;
              <h6 class="ue-value">
                {this.context.events[i].eventStartTime} To{" "}
                {this.context.events[i].eventEndTime}
              </h6>
              <br />
              <h5 class="ue-attribute" href="#">
                Contact :-
              </h5>
              &ensp;
              <h6 class="ue-value">{this.context.events[i].email}</h6>
              <br />
              <h5 class="ue-attribute" href="#">
                Location :-{" "}
              </h5>
              &ensp;
              <h6 class="ue-value">
                {(this.context.events[i].location.poi !== ""
                  ? this.context.events[i].location.poi + ", "
                  : "") +
                  (this.context.events[i].location.street !== ""
                    ? this.context.events[i].location.street + ", "
                    : "") +
                  (this.context.events[i].location.subSubLocality !== ""
                    ? this.context.events[i].location.subSubLocality + ", "
                    : "") +
                  (this.context.events[i].location.subLocality !== ""
                    ? this.context.events[i].location.subLocality + ", "
                    : "") +
                  (this.context.events[i].location.locality !== ""
                    ? this.context.events[i].location.locality + ", "
                    : "") +
                  (this.context.events[i].location.village !== ""
                    ? this.context.events[i].location.village + ", "
                    : "") +
                  (this.context.events[i].location.district !== ""
                    ? this.context.events[i].location.district + ", "
                    : "") +
                  (this.context.events[i].location.subDistrict !== ""
                    ? this.context.events[i].location.subDistrict + ", "
                    : "") +
                  (this.context.events[i].location.city !== ""
                    ? this.context.events[i].location.city + ", "
                    : "") +
                  (this.context.events[i].location.state !== ""
                    ? this.context.events[i].location.state + ", "
                    : "") +
                  (this.context.events[i].location.pincode !== ""
                    ? this.context.events[i].location.pincode + " "
                    : "")}
              </h6>
              <br />
              <h5 class="ue-attribute" href="#">
                Description :-{" "}
              </h5>
              &ensp;
              <h6 class="ue-value">
                {this.context.events[i].eventDescription}
              </h6>
              <br />
            </div>
          </div>
          <br />
        </div>
      );
    }
    return (
      <div class="container">
        <br />
        <h2 class="ue-head">Upcoming Blood Donation Camps Near You</h2>
        <br />
        <br />
        {events}
      </div>
    );
  }
}
export default Events;
