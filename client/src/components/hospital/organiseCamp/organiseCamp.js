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
    var camp = {
      name: this.context.name,
      email: this.context.email,
      location: this.context.location,
      ...this.state,
    };
    console.log(camp);
    this.context.organiseCamp(camp);
  };
  render() {
    return (
      <div>
        <center>
          <h1>Organise A Blood Camp</h1>
          <br></br>
          <form onSubmit={this.onFormSubmit}>
            <div class="mb-3 row">
              <label for="eventName" class="col-sm-2 col-form-label">
                Event Name:-
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="text"
                  class="form-control w-75"
                  id="eventName"
                  placeholder="Enter Event Name"
                  onChange={(e) => {
                    this.setState({ eventName: e.target.value });
                  }}
                  value={this.state.eventName}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="eventDate" class="col-sm-2 col-form-label">
                Date:-
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="date"
                  class="form-control w-75"
                  id="eventDate"
                  onChange={(e) => {
                    this.setState({ eventDate: e.target.value });
                  }}
                  value={this.state.eventDate}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="eventStartTime" class="col-sm-2 col-form-label">
                Start Time:-
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="time"
                  class="form-control w-75"
                  id="eventStartTime"
                  onChange={(e) => {
                    this.setState({ eventStartTime: e.target.value });
                  }}
                  value={this.state.eventStartTime}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="eventEndTime" class="col-sm-2 col-form-label">
                End Time:-
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="time"
                  class="form-control w-75"
                  id="eventEndTime"
                  onChange={(e) => {
                    this.setState({ eventEndTime: e.target.value });
                  }}
                  value={this.state.eventEndTime}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="description" class="col-sm-2 col-form-label">
                Description:-{" "}
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="text"
                  class="form-control w-75"
                  id="description"
                  onChange={(e) => {
                    this.setState({ eventDescription: e.target.value });
                  }}
                  value={this.state.eventDescription}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">
                Contact Email:-
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
                Location:-{" "}
              </label>
              <div class="col-sm-10">
                <textarea
                  type="text"
                  class="form-control w-75"
                  id="location"
                  disabled
                  value={
                    this.context.name +
                    ", " +
                    this.context.location.poi +
                    ", " +
                    this.context.location.street +
                    ", " +
                    this.context.location.subSubLocality +
                    ", " +
                    this.context.location.subLocality +
                    ", " +
                    this.context.location.locality +
                    ", " +
                    this.context.location.village +
                    ", " +
                    this.context.location.district +
                    ", " +
                    this.context.location.subDistrict +
                    ", " +
                    this.context.location.city +
                    ", " +
                    this.context.location.state +
                    ", " +
                    this.context.location.pincode
                  }
                />
              </div>
            </div>
            <button type="submit" class="btn w-50 btn-success">
              Create Event
            </button>
          </form>
          <div id="eventMessage" class="mb-3 row"></div>
        </center>
      </div>
    );
  }
}

export default OrganiseCamp;
