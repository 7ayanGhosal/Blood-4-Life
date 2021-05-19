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
              <h5 class="ue-attribute" href="#">
                Name :-
              </h5>
              &ensp;
              <h5 class="ue-value">{this.context.events[i].eventName}</h5>
              <br />
              <h5 class="ue-attribute" href="#">
                Date :-
              </h5>
              &ensp;
              <h5 class="ue-value">{this.context.events[i].eventDate}</h5>
              <br />
              <h5 class="ue-attribute" href="#">
                Time :-
              </h5>
              &ensp;
              <h5 class="ue-value">
                {this.context.events[i].eventStartTime} To{" "}
                {this.context.events[i].eventEndTime}
              </h5>
              <br />
              <h5 class="ue-attribute" href="#">
                Contact :-
              </h5>
              &ensp;
              <h5 class="ue-value">{this.context.events[i].email}</h5>
              <br />
              <h5 class="ue-attribute" href="#">
                Location :-{" "}
              </h5>
              &ensp;
              <h5 class="ue-value">
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
              </h5>
              <br />
              <h5 class="ue-attribute" href="#">
                Description :-{" "}
              </h5>
              &ensp;
              <h5 class="ue-value">
                {this.context.events[i].eventDescription}
              </h5>
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
        <h3>Upcoming Blood Donation Camps</h3>
        <br />
        <br />
        {events}
      </div>
    );
  }
}

export default Events;
