import React, { Component } from "react";
import Map from "./map/map";
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
      latitude: 0,
      longitude: 0,
      address: "", //denotes the adress written inside the search box
      results: [],
      location: {
        poi: "",
        street: "",
        subSubLocality: "",
        subLocality: "",
        locality: "",
        village: "",
        district: "",
        subDistrict: "",
        city: "",
        state: "",
        pincode: "",
        eloc: "",
      },
    };
    this.getUserLocation = () => {
      window.navigator.geolocation.getCurrentPosition(
        (res) => {
          this.setState({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          });
          axios
            .get(
              "/map/getEloc/" + res.coords.latitude + "/" + res.coords.longitude
            )
            .then(
              (Res) => {
                this.pointLocation(Res.data);
              },
              (err) => {
                console.log(err);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
    };

    this.pointLocation = (eloc) => {
      axios.get("/map/eloc/" + eloc).then((res) => {
        this.setState({
          latitude: res.data.lat,
          longitude: res.data.long,
          results: [],
          address: res.data.address,
          location: {
            poi: res.data.poi,
            street: res.data.street,
            subSubLocality: res.data.subSubLocality,
            subLocality: res.data.subLocality,
            locality: res.data.locality,
            village: res.data.village,
            district: res.data.district,
            subDistrict: res.data.subDistrict,
            city: res.data.city,
            state: res.data.state,
            pincode: res.data.pincode,
            eloc: eloc,
          },
        });
      });
    };

    this.addressChange = (e) => {
      this.setState({ address: e.target.value });
      axios.get("/map/suggest/" + this.state.address).then((res) => {
        this.setState({ results: res.data });
      });
    };
    this.dragHandler = (e) => {
      this.setState({
        longitude: e.target._latlng.lng,
        latitude: e.target._latlng.lat,
      });
      axios
        .get(
          "/map/getEloc/" + e.target._latlng.lat + "/" + e.target._latlng.lng
        )
        .then(
          (Res) => {
            console.log(Res);
            this.pointLocation(Res.data);
          },
          (err) => {
            console.log(err);
          }
        );
    };

    this.onFormSubmit = (e) => {
      e.preventDefault();
      var res = {
        details: {
          name: this.state.name,
          contact: this.state.contact,
          bloodGroup: this.state.bloodGroup,
          rhFactor: this.state.rhFactor,
        },
        location: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          ...this.state.location,
        },
      };
      this.context.emergency(res); //HAVE TO CHANGE THIS FOR SENDING LOCATION DETAILS!!!!
    };
  }

  componentDidMount() {
    //console.log(this.context.authenticated);
    if (this.context.authenticated && !this.context.isHospital) {
      this.setState({
        name: this.context.firstName + " " + this.context.lastName,
        contact: this.context.email,
        bloodGroup: this.context.bloodGroup,
        rhFactor: this.context.rhFactor,
      });
    }

    this.getUserLocation();
  }
  // ADDING ONCLICK TO SUGGESTIONS
  componentDidUpdate() {
    for (var i = 0; i < this.state.results.length; i++) {
      var eloc = this.state.results[i].eLoc;
      var ele = document.getElementById("suggestion" + i);
      ele.onclick = (e) => {
        this.pointLocation(e.target.getAttribute("name"));
      };
    }
  }
  render() {
    var mapJSX = (
      <div id="MAP">
        <Map
          key={this.state.latitude + this.state.longitude}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          dragHandler={this.dragHandler}
        ></Map>
      </div>
    );
    var suggestions = [];
    for (var i = 0; i < this.state.results.length; i++) {
      var eloc = this.state.results[i].eLoc;
      suggestions.push(
        <div>
          <li
            class="list-group-item suggestions"
            id={"suggestion" + i}
            name={this.state.results[i].eLoc}
          >
            {this.state.results[i].placeName +
              ", " +
              this.state.results[i].placeAddress}
          </li>
        </div>
      );
    }

    return (
      <div class="container">
        <form onSubmit={this.onFormSubmit}>
          <h5>Name :</h5>
          <input
            class="form-control"
            name="name"
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
            placeholder="Enter Your Name"
            required
          ></input>
          <br></br>
          <h5>Contact Details (email/phone):</h5>
          <p>(Note: Hospitals might contact you if required)</p>
          <input
            class="form-control"
            name="contact"
            type="text"
            onChange={(e) => this.setState({ contact: e.target.value })}
            value={this.state.contact}
            placeholder="Email/ Phone Number"
            required
          ></input>
          <br></br>
          <h5>Blood Group:</h5>
          <select
            name="bloodGroup"
            value={this.state.bloodGroup}
            onChange={(e) => {
              this.setState({ bloodGroup: e.target.value });
            }}
          >
            <option value="">Not Sure</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
          <br /> <br />
          <h5>Rh factor :</h5>
          <select
            name="rhFactor"
            value={this.state.rhFactor}
            onChange={(e) => {
              this.setState({ rhFactor: e.target.value });
            }}
          >
            <option value="">Not Sure</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
          <br />
          <br></br>
          <h5>Enter your address</h5>
          <input
            class="form-control"
            name="address"
            type="text"
            onChange={this.addressChange}
            value={this.state.address}
            placeholder="Enter your address"
            required
          ></input>
          <div class="slist" id="suggestions">
            <ul class="list-group">{suggestions}</ul>
          </div>
          <br></br>
          <h5>
            Or, drag the pointer in the map below (Use scroll to zoom in/out)
          </h5>
          {mapJSX}
          <button type="submit" className="btn btn-success w-100 mt-1">
            Create Account
          </button>
        </form>
      </div>
    );
  }
}

export default PlacePicker;
