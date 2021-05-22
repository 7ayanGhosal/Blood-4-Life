import React, { Component } from "react";
import Map from "./map/map";
import "./ourNetwork.css";
import axios from "axios";
import userMarker from "../../resources/user_marker.png";
import hospitalMarker from "../../resources/hospital_marker.png";

class OurNetwork extends Component {
  state = { users: [], hospitals: [], icons: {}, loading: true };

  stopLoader = () => {
    this.setState({ loading: false }, () => {
      document.getElementById("div-map2").style.display = "block";
    });
  };

  toggler = (str) => {
    var icons = document.getElementsByTagName("img");
    var i;

    if (str === "user") {
      for (i = 0; i < icons.length; i++) {
        if (icons[i].title === "Hospital") {
          icons[i].classList.add("d-none");
        } else if (icons[i].title === "User") {
          icons[i].classList.remove("d-none");
        }
      }
    } else if (str === "hospital") {
      for (i = 0; i < icons.length; i++) {
        if (icons[i].title === "Hospital") {
          icons[i].classList.remove("d-none");
        } else if (icons[i].title === "User") {
          icons[i].classList.add("d-none");
        }
      }
    } else {
      for (i = 0; i < icons.length; i++) {
        if (icons[i].title === "Hospital" || icons[i].title === "User") {
          icons[i].classList.remove("d-none");
        }
      }
    }
  };

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
      } else if (icons[i].title === "midPoint") {
        icons[i].classList.add("d-none");
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
      <div>
        <div class="net-row container-fluid mb-3">
          <div id="OurNetwork" class="row">
            <div class="col col-12 col-md-6 d-flex align-items-center">
              <div class="w-100 text-center">
                <p>
                  We Feel Proud To Inform You That Our Vast Community Of Happy
                  Donors Includes
                </p>
                <p>User Count: {this.state.users.length}</p>
                <p>Hospital Count: {this.state.hospitals.length}</p>
                <p>Spread The Word, Donate Blood :)</p>
                <div>
                  <div class="switch-toggle switch-3 switch-candy">
                    <input id="on" name="state-d" type="radio" />
                    <label for="on" onClick={() => this.toggler("both")}>
                      Both
                    </label>

                    <input id="na" name="state-d" type="radio" />
                    <label for="na" onClick={() => this.toggler("user")}>
                      User
                    </label>

                    <input id="off" name="state-d" type="radio" />
                    <label for="off" onClick={() => this.toggler("hospital")}>
                      Hospital
                    </label>
                    <a></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-12 col-md-6 p-3">
              <div id="div-map" class="MAP">
                <div></div>
                {this.state.loading ? (
                  <div class="d-flex align-items-center justify-content-center text-danger map-loader">
                    <div class="loader">Loading...</div>
                    {/* <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div> */}
                  </div>
                ) : null}
                <div id="div-map2">
                  <Map
                    key={this.state.users.length + this.state.hospitals.length}
                    UserPoints={this.state.users}
                    HospitalPoints={this.state.hospitals}
                    stopLoader={this.stopLoader}
                  ></Map>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurNetwork;
