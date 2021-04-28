import React, { Component } from "react";
import Map from "./map/map";
import "./ourNetwork.css";
import axios from "axios";
import userMarker from "../../resources/user_marker.png";
import hospitalMarker from "../../resources/hospital_marker.png";

class OurNetwork extends Component {
  state = { users: [], hospitals: [], icons: {} };
  componentDidUpdate() {
    var flag = true;
    var icons = document.getElementsByTagName("img");
    for (var i = 0; i < icons.length; i++) {
      if (icons[i].title === "Hospital") {
        flag = false;
        icons[i].src = hospitalMarker;
        icons[i].classList.add("marker-icon");
      } else if (icons[i].title === "User") {
        flag = false;
        icons[i].src = userMarker;
        icons[i].classList.add("marker-icon");
      }
    }
    if (flag) {
      setTimeout(() => {
        this.forceUpdate();
      }, 500);
    }
  }
  async componentDidMount() {
    var userPoints = [];
    var hospitalPoints = [];
    await axios.get("/get/users").then(
      (res) => {
        userPoints = res.data;
        this.setState({ users: userPoints });
      },
      (err) => {
        console.log(err);
      }
    );
    await axios.get("/get/hospitals").then(
      (Res) => {
        hospitalPoints = Res.data;
        this.setState({ hospitals: hospitalPoints });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  render() {
    return (
      <div class="container-fluid">
        <div id="OurNetwork" class="row">
          <div class="col col-12 col-md-6 d-flex align-items-center">
            <div class="w-100">
              <p>
                We Feel Proud To Inform You That Our Vast Community Of Happy
                Donors Includes
              </p>
              <p>User Count: {this.state.users.length}</p>
              <p>Hospital Count: {this.state.hospitals.length}</p>
              <p>Spread The Word, Donate Blood :)</p>
            </div>
          </div>
          <div class="col col-12 col-md-6">
            <div class="MAP">
              <Map
                key={this.state.users.length + this.state.hospitals.length}
                UserPoints={this.state.users}
                HospitalPoints={this.state.hospitals}
              ></Map>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurNetwork;
