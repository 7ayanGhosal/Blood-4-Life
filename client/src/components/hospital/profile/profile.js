import React from "react";
import axios from "axios";
import Map from "./map/map";
import AuthContext from "../../../context/auth-context";
import "./profile.css";

class Profile extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      address: "",
      results: [],
      // ...this.context,
      close: "closeProfileResetModal",
    };

    this.onFormSubmit = (event) => {
      event.preventDefault();
      // console.log(this.state);
      this.context.resetProfile(this.state);
    };
    this.getUserLocation = () => {
      this.setState({
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        address:
          this.state.location.poi +
          this.state.location.street +
          this.state.location.subSubLocality +
          this.state.location.subLocality +
          this.state.location.locality +
          this.state.location.village +
          this.state.location.district +
          this.state.location.subDistrict +
          this.state.location.city +
          this.state.location.state +
          this.state.location.pincode,
      });
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
            latitude: res.data.lat,
            longitude: res.data.long,
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
  }
  componentDidMount() {
    this.setState({ ...this.context }, () => {
      this.getUserLocation();
    });
  }
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
      <div id="MAP2">
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
        <div class="card-body hprofile-bg">
          {/* QR CODE */}
          <img
            id="QRCode"
            class="hospital-pic"
            src={
              "https://api.qrserver.com/v1/create-qr-code/?data=https://blood-for-life.herokuapp.com/hospital/qr/" +
              this.context.email +
              "&amp;size=50x50"
            }
            alt=""
            title=""
          />
          <br />
          <br />
          <h2 class="card-title">Profile Details</h2>
          <br />
          <div class="cardtext">
            <h3 class="p-attribute" href="#">
              Name :-{" "}
            </h3>
            &ensp;
            <h3 class="p-value">{this.context.name}</h3>
            <br />
            <br />
            <h3 class="p-attribute" href="#">
              Email :-{" "}
            </h3>
            &ensp;
            <h3 class="p-value">{this.context.email}</h3>
            <br />
            <br />
            <h3 class="p-attribute" href="#">
              Address :-{" "}
            </h3>
            &ensp;
            <h3 class="p-value">
              {this.context.location.poi +
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
                this.context.location.pincode}
            </h3>
            <br />
            <br />
          </div>
          <button
            type="button"
            class="btn btn-success edit-profile"
            data-bs-toggle="modal"
            data-bs-target="#profileResetModal"
          >
            Edit Profile
          </button>
          <br />
          <br />
        </div>

        <div
          class="modal fade"
          id="profileResetModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabe"
          aria-hidden="true"
        >
          <form
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-new2"
            onSubmit={this.onFormSubmit}
          >
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title editph" id="exampleModalLabel">
                  Edit Profile
                </h1>
                <button
                  id="closeProfileResetModal"
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="card w-100" style={{ width: 18 + "rem" }}>
                  <img
                    src="https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
                    class="card-img-top hospital-pic"
                    alt="..."
                  />
                  <input class="img-change" type="file" />
                  <br /> <br />
                  <div class="card-body">
                    <h3 class="card-title p-card">Profile</h3>
                    <br />
                    <div class="cardtext">
                      <h3 class="p-attribute" href="#">
                        Name :-&ensp;{" "}
                      </h3>
                      <input
                        class="p-value form-control hp-modal-input"
                        type="text"
                        value={this.state.name}
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                      <br />
                      <br />
                      <hr class="hr-style"></hr>
                      <div>
                        <h4 class="hp-placepicker">Enter your address</h4>
                        <input
                          class="form-control hp-modal-input2"
                          name="address"
                          type="text"
                          onChange={this.addressChange}
                          value={this.state.address}
                          placeholder="Enter your address"
                        ></input>
                        <div class="slist" id="suggestions">
                          <ul class="list-group">{suggestions}</ul>
                        </div>
                        <br />
                        <br />
                        <h5>
                          Or, drag the pointer in the map below (Use scroll to
                          zoom in/out)
                        </h5>
                        {mapJSX}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
