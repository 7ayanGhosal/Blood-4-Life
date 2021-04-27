import React, { Component } from "react";
import Map from "./map/map";
import "./ourNetwork.css";

import axios from "axios";

class PlacePicker extends Component {
  state = {};

  render() {
    var userPoints = [];
    var hospitalPoints = [];
    axios.get("/get/users").then(
      (res) => {
        userPoints = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
    axios.get("/get/hospitals").then(
      (res) => {
        hospitalPoints = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
    return (
      <div id="OurNetwork">
        <Map
          UserPoints={this.userPoints}
          HospitalPoints={this.hospitalPoints}
        ></Map>
      </div>
    );
  }
}

export default PlacePicker;
