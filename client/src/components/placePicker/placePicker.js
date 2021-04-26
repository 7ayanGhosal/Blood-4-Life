import React, { Component } from "react";
import Map from "./map/map";
import "./placePicker.css";

import axios from "axios";

class PlacePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      location: "",
      results: [],
    };
    this.getUserLocation = () => {
      window.navigator.geolocation.getCurrentPosition(
        (res) => {
          this.setState({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          });
          // console.log(this.state.latitude + " " + this.state.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    this.pointLocation = (eloc) => {
      axios.get("/eloc/" + eloc).then((res) => {
        this.setState({
          latitude: res.data.lat,
          longitude: res.data.long,
          results: [],
          location: res.data.address,
        });
      });
    };

    this.locationChange = (e) => {
      this.setState({ location: e.target.value });
      axios.get("/suggest/" + this.state.location).then((res) => {
        // console.log(res);
        this.setState({ results: res.data });
      });
    };
    this.dragHandler = (e) => {
      this.setState({
        longitude: e.target._latlng.lng,
        latitude: e.target._latlng.lat,
      });
    };
  }

  componentDidMount() {
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
      <div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#placepickerModal"
        >
          Launch PlacePicker
        </button>
        <div
          class="modal fade"
          id="placepickerModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
              <button
                id="closeLoginModal"
                type="button"
                class="btn-close modal-close-button"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={this.reset}
              ></button>
              <div class="modal-body">
                <h5>Enter your location</h5>
                <input
                  class="form-control"
                  name="address"
                  type="text"
                  onChange={this.locationChange}
                  value={this.state.location}
                  placeholder="Enter your location"
                ></input>
                <div class="slist" id="suggestions">
                  <ul class="list-group">{suggestions}</ul>
                </div>
                <br></br>
                <h5>
                  Or, drag the pointer in the map below (Use scroll to zoom
                  in/out)
                </h5>
                {mapJSX}
                <button className="btn btn-success w-100 mt-1">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlacePicker;
