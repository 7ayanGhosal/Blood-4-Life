import React, { Component } from "react";
// import Map from "./map/map";
import "./placePicker.css";
import AuthContext from "../../../context/auth-context";
import axios from "axios";

class PlacePicker extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
      bloodGroup: "",
      rhFactor: "",
      address: "", //denotes the adress written inside the search box
      maxDistance: 200,
      Hospitals: [],
      location: {},
    };

    this.onFormSubmit = async (e) => {
      e.preventDefault();
      var res = {
        details: {
          name: this.state.name,
          contact: this.state.contact,
          bloodGroup: this.state.bloodGroup,
          rhFactor: this.state.rhFactor,
          maxDistance: this.state.maxDistance,
        },
        location: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          ...this.state.location,
        },
      };
      this.props.hospSearch(res);
    };
  }

  componentDidMount() {
    this.setState({
      name: this.context.name,
      contact: this.context.email,
      address:
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
        this.context.location.pincode,
      location: this.context.location,
    });
  }

  render() {
    return (
      <div class="container">
        <form onSubmit={this.onFormSubmit}>
          <h5>Name :</h5>
          <input
            class="form-control"
            name="name"
            type="text"
            value={this.state.name}
            disabled
          ></input>
          <br></br>
          <h5>Contact Details (email/phone):</h5>
          <p>(Note: Hospitals might contact if required)</p>
          <input
            class="form-control"
            name="contact"
            type="text"
            value={this.state.contact}
            disabled
          ></input>
          <br></br>
          <h5>Address</h5>
          <textarea
            class="form-control"
            name="address"
            type="text"
            value={this.state.address}
            disabled
          />
          {/* <div class="slist" id="suggestions">
            <ul class="list-group">{suggestions}</ul>
          </div> */}
          <br></br>
          <h5 class="d-inline">Blood Group:</h5>
          <select
            name="bloodGroup"
            class="d-inline"
            value={this.state.bloodGroup}
            onChange={(e) => {
              this.setState({ bloodGroup: e.target.value });
            }}
            required
          >
            <option value="">select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
          {/* <br /> <br /> */}
          <h5 class="d-inline">Rh factor :</h5>
          <select
            name="rhFactor"
            class="d-inline"
            value={this.state.rhFactor}
            onChange={(e) => {
              this.setState({ rhFactor: e.target.value });
            }}
            required
          >
            <option value="">select</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
          <br></br>
          <br></br>
          <h5 class="d-inline">Max Distance (KM):</h5>
          <input
            type="number"
            name="maxDistance"
            class="d-inline"
            value={this.state.maxDistance}
            onChange={(e) => {
              this.setState({ maxDistance: e.target.value });
            }}
            required
          ></input>
          <br></br>
          <br></br>
          <button type="submit" className="btn btn-success w-100 mt-1">
            Submit
          </button>
        </form>
        <div id="NearbyHospitals"></div>
      </div>
    );
  }
}

export default PlacePicker;
