import React, { Component } from "react";
import Map from "./map/map";
import "./ourNetwork.css";
import axios from "axios";

class OurNetwork extends Component {
  state = { users: [], hospitals: [], icons: {} };
  componentDidUpdate() {
    var flag = true;
    var icons = document.getElementsByTagName("img");
    for (var i = 0; i < icons.length; i++) {
      if (icons[i].title === "Hospital") {
        flag = false;
        icons[i].src =
          "https://lh3.googleusercontent.com/proxy/fwyOBIyrCV4544gswEC22yjctI2JmORYuKYveKWDPgnO83TUeouz9YyGf3E3C1_pSPoaFqWR1ifr5ROjjooOM58XZLg9YuLdVqWN";
        icons[i].classList.add("marker-icon");
      } else if (icons[i].title === "User") {
        flag = false;
        icons[i].src =
          "https://lh3.googleusercontent.com/proxy/3IfxdXN4LC1SUBWYXupLJCYW6pPkoxYq2sIZ6gN0GvFtTHrdbowHzsAaxS_4mVQKo03pcfuRaT5vRgD2lGwirwNMFSxKrgR76LS8";
        icons[i].classList.add("marker-icon");
      }
    }
    if (flag) {
      setTimeout(() => {
        this.forceUpdate();
      }, 2000);
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
      <div id="OurNetwork">
        <Map
          key={this.state.users.length + this.state.hospitals.length}
          UserPoints={this.state.users}
          HospitalPoints={this.state.hospitals}
        ></Map>
      </div>
    );
  }
}

export default OurNetwork;
