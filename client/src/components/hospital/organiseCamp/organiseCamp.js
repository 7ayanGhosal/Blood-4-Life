import React from "react";
import AuthContext from "../../../context/auth-context";
import "./organiseCamp.css";

class OrganiseCamp extends React.Component {
  static contextType = AuthContext;
  state = {
    eventName: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventDescription: "",
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    // TIME CHECK
    var d_start = new Date(this.state.eventDate);
    var h_s = parseInt(
      this.state.eventStartTime[0] + this.state.eventStartTime[1]
    );
    var m_s = parseInt(
      this.state.eventStartTime[3] + this.state.eventStartTime[4]
    );
    d_start.setHours(h_s, m_s, 0);

    var d_end = new Date(this.state.eventDate);
    var h_e = parseInt(this.state.eventEndTime[0] + this.state.eventEndTime[1]);
    var m_e = parseInt(this.state.eventEndTime[3] + this.state.eventEndTime[4]);
    d_end.setHours(h_e, m_e, 0);

    var d_now = new Date();

    if (d_start <= d_now) {
      document.getElementById("eventMessage").innerHTML =
        "<h5>Past Events Cannot Created!!!<//h5>";
    } else if (d_end <= d_start) {
      document.getElementById("eventMessage").innerHTML =
        "<h5>Start Time Cannot Be After End Time!!!<//h5>";
    } else {
      var camp = {
        name: this.context.name,
        email: this.context.email,
        location: this.context.location,
        ...this.state,
      };
      this.context.organiseCamp(camp);
    }
  };
  render() {
    return (
      <div class="oc-bg mb-3 p-3">
        <center>
          <h1 class="oc-head">Organise A Blood Donation Camp</h1>
          <br />
          <br />
          <form onSubmit={this.onFormSubmit}>
            <div class="mb-3 row">
              <label for="eventName" class="col-sm-2 col-form-label">
                Event Name :-
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="text"
                  class="form-control w-75"
                  id="eventName"
                  placeholder="Enter Event Name"
                  onChange={(e) => {
                    document.getElementById("eventMessage").innerHTML = "";
                    this.setState({ eventName: e.target.value });
                  }}
                  value={this.state.eventName}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="eventDate" class="col-sm-2 col-form-label">
                Date :-
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="date"
                  class="form-control w-75"
                  id="eventDate"
                  onChange={(e) => {
                    document.getElementById("eventMessage").innerHTML = "";
                    this.setState({ eventDate: e.target.value });
                  }}
                  value={this.state.eventDate}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="eventStartTime" class="col-sm-2 col-form-label">
                Start Time :-
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="time"
                  class="form-control w-75"
                  id="eventStartTime"
                  onChange={(e) => {
                    document.getElementById("eventMessage").innerHTML = "";
                    this.setState({ eventStartTime: e.target.value });
                  }}
                  value={this.state.eventStartTime}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="eventEndTime" class="col-sm-2 col-form-label">
                End Time :-
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="time"
                  class="form-control w-75"
                  id="eventEndTime"
                  onChange={(e) => {
                    document.getElementById("eventMessage").innerHTML = "";
                    this.setState({ eventEndTime: e.target.value });
                  }}
                  value={this.state.eventEndTime}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="description" class="col-sm-2 col-form-label">
                Description :-{" "}
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="text"
                  class="form-control w-75"
                  id="description"
                  onChange={(e) => {
                    document.getElementById("eventMessage").innerHTML = "";
                    this.setState({ eventDescription: e.target.value });
                  }}
                  value={this.state.eventDescription}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">
                Contact Email :-
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control w-75"
                  id="eventemail"
                  disabled
                  value={this.context.email}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="location" class="col-sm-2 col-form-label">
                Location :-{" "}
              </label>
              <div class="col-sm-10">
                <textarea
                  type="text"
                  class="form-control w-75"
                  id="location"
                  disabled
                  value={
                    (this.context.location.poi !== ""
                      ? this.context.location.poi + ", "
                      : "") +
                    (this.context.location.street !== ""
                      ? this.context.location.street + ", "
                      : "") +
                    (this.context.location.subSubLocality !== ""
                      ? this.context.location.subSubLocality + ", "
                      : "") +
                    (this.context.location.subLocality !== ""
                      ? this.context.location.subLocality + ", "
                      : "") +
                    (this.context.location.locality !== ""
                      ? this.context.location.locality + ", "
                      : "") +
                    (this.context.location.village !== ""
                      ? this.context.location.village + ", "
                      : "") +
                    (this.context.location.district !== ""
                      ? this.context.location.district + ", "
                      : "") +
                    (this.context.location.subDistrict !== ""
                      ? this.context.location.subDistrict + ", "
                      : "") +
                    (this.context.location.city !== ""
                      ? this.context.location.city + ", "
                      : "") +
                    (this.context.location.state !== ""
                      ? this.context.location.state + ", "
                      : "") +
                    (this.context.location.pincode !== ""
                      ? this.context.location.pincode + " "
                      : "")
                  }
                />
                <br />
                <br />
                <div class="col-sm-10">
                  <button type="submit" class="btn btn-dark camp-create ">
                    Create Event
                  </button>
                </div>
              </div>
            </div>
            <br />
          </form>
          <div id="eventMessage" class="mb-3 row"></div>
        </center>
      </div>
    );
  }
}

export default OrganiseCamp;
