import React, { Component } from "react";
import "./upcomingEvents.css";
import AuthContext from "../../../context/auth-context";

class Events extends Component {
  static contextType = AuthContext;
  render() {
    var events = [];

    //sort the context events
    this.context.events.sort((a, b) => {
      var d_a = new Date(a.eventDate);
      var h_a = parseInt(a.eventStartTime[0] + a.eventStartTime[1]);
      var m_a = parseInt(a.eventStartTime[3] + a.eventStartTime[4]);
      d_a.setHours(h_a, m_a, 0);
      var d_b = new Date(b.eventDate);
      var h_b = parseInt(b.eventStartTime[0] + b.eventStartTime[1]);
      var m_b = parseInt(b.eventStartTime[3] + b.eventStartTime[4]);
      d_b.setHours(h_b, m_b, 0);
      return d_b - d_a;
    });

    //generate the jsx for events
    for (var i = 0; i < this.context.events.length; i++) {
      var d = new Date(this.context.events[i].eventDate);
      var h = parseInt(
        this.context.events[i].eventEndTime[0] +
          this.context.events[i].eventEndTime[1]
      );
      var m = parseInt(
        this.context.events[i].eventEndTime[3] +
          this.context.events[i].eventEndTime[4]
      );
      d.setHours(h, m, 0);
      var d_now = new Date();
      events.push(
        <div>
          <div class={"card ue " + (d < d_now ? "upast" : "")}>
            <div class="card-header">
              <h3 class="ue-cardh">{this.context.events[i].eventName} </h3>
              &emsp;
              <p class="ue-note ">
                {d < d_now ? "(NOTE: This camp is already over)" : ""}
              </p>
            </div>
            <div class="card-body">
              <h5 class="ue-attribute" href="#">
                Date :-
              </h5>
              &ensp;
              <h6 class="ue-value">
                {this.context.events[i].eventDate.slice(0, 10)}
              </h6>
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
        <h2 class="ue-head">My Blood Donation Camps</h2>
        <br />
        <br />
        {events}
      </div>
    );
  }
}

export default Events;
