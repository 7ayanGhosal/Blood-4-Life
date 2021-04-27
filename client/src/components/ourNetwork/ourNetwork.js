import React, { Component } from "react";
import Map from "./map/map";
import "./ourNetwork.css";
import axios from "axios";

class OurNetwork extends Component {
  state = { users: [], hospitals: [] };
  componentDidMount() {
    var userPoints = [];
    var hospitalPoints = [];
    axios.get("/get/users").then(
      (res) => {
        console.log("XXXX");
        userPoints = res.data;
        axios.get("/get/hospitals").then(
          (Res) => {
            hospitalPoints = Res.data;
            this.setState({ users: userPoints, hospitals: hospitalPoints });
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  render() {
    return (
      <div id="OurNetwork">
        <Map
          UserPoints={this.state.users}
          HospitalPoints={this.state.hospitals}
        ></Map>
      </div>
    );
  }
}

export default OurNetwork;
