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
      <div class="hospital_style mb-3">
      <div class="container">
        <form onSubmit={this.onFormSubmit}>
          <h4>Name :</h4>
          <input
            class="form-control"
            name="name"
            type="text"
            value={this.state.name}
            disabled
          ></input>
          <br></br>
          <h4>Contact Details (email/phone):</h4>
          <p>(Note: Hospitals might contact if required)</p>
          <input
            class="form-control"
            name="contact"
            type="text"
            value={this.state.contact}
            disabled
          ></input>
          <br></br>
          <h4>Address:</h4>
          <textarea
            class="form-control"
            name="address"
            type="text"
            value={this.state.address}
            disabled
          />

          <br></br>
          <div class="d-inline-block bloodgroup-selection">
          <h4 class="d-inline p-3">Blood Group:</h4>
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
           </div>
           <div class="d-inline-block bloodgroup-selection">
          <h4 class="d-inline m-auto p-3">Rh factor :</h4>
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
          </div>
          <br></br>
          <br></br>
          <h4 class="d-inline">Max Distance (KM):</h4>
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
      </div>
    );
  }
}

export default PlacePicker;
