import React from "react";
import axios from "axios";
import Map from "./map/map";
import AuthContext from "../../../context/auth-context";
import MaleAvatar from "../../../resources/MaleAvatar.jpg";
import FemaleAvatar from "../../../resources/FemaleAvatar.jpg";
import MaleAvatar2 from "../../../resources/MaleAvatar2.jpg";
import FemaleAvatar2 from "../../../resources/FemaleAvatar2.jpg";
import MaleAvatar3 from "../../../resources/MaleAvatar3.jpg";
import FemaleAvatar3 from "../../../resources/FemaleAvatar3.jpg";
import MaleAvatar4 from "../../../resources/MaleAvatar4.jpg";
import FemaleAvatar4 from "../../../resources/FemaleAvatar4.jpg";
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
      var address = "";
      if (this.state.location.poi) address += this.state.location.poi + ", ";
      if (this.state.location.street)
        address += this.state.location.street + ", ";
      if (this.state.location.subSubLocality)
        address += this.state.location.subSubLocality + ", ";
      if (this.state.location.subLocality)
        address += this.state.location.subLocality + ", ";
      if (this.state.location.locality)
        address += this.state.location.locality + ", ";
      if (this.state.location.village)
        address += this.state.location.village + ", ";
      if (this.state.location.district)
        address += this.state.location.district + ", ";
      if (this.state.location.subDistrict)
        address += this.state.location.subDistrict + ", ";
      if (this.state.location.city) address += this.state.location.city + ", ";
      if (this.state.location.state)
        address += this.state.location.state + ", ";
      if (this.state.location.pincode) address += this.state.location.pincode;

      this.setState({
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        address: address,
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
      <div class="MAP-up">
        <div id="MAP-up">
          <Map
            key={this.state.latitude + this.state.longitude + Math.random()}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            dragHandler={this.dragHandler}
          ></Map>
        </div>
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
          id="openProfileSideNav"
          class="btn btn-primary d-none"
          type="button"
          // data-bs-toggle="offcanvas"
          // data-bs-target="#offcanvasWithBothOptions"
          // aria-controls="offcanvasWithBothOptions"
        >
          Profile Sidenav
        </button>
        <div
          class="offcanvas offcanvas-start sidenav-bg"
          data-bs-scroll="true"
          tabindex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div class="offcanvas-header p-head">
            <h3 class="card-title" id="offcanvasWithBothOptionsLabel">
              Profile Details
            </h3>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body profile-bg">
            <center>
              <img
                id="avatar"
                src={this.context.gender === "Male" ? MaleAvatar : FemaleAvatar}
                class="card-img-top user-dp"
                alt="..."
              />
            </center>
            <br />
            <br />
            <div class="cardtext">
              <h6 class="p-attribute" href="#">
                Name :-{" "}
              </h6>
              &ensp;
              <h6 class="p-value">
                {this.context.firstName + " " + this.context.lastName}
              </h6>
              <br />
              <br />
              <h6 class="p-attribute" href="#">
                Address :-{" "}
              </h6>
              &ensp;
              <h6 class="p-value">
                {(this.context.location.poi !== ""
                  ? this.context.location.poi + ", "
                  : "") +
                  (this.context.location.street !== ""
                    ? this.context.location.street + ", "
                    : "") +
                  (this.context.location.subSubLocality !== ""
                    ? this.context.location.subSubLocality + ", "
                    : "") +
                  (this.context.location.subLocality !== ""
                    ? this.context.location.subLocality + ", "
                    : "") +
                  (this.context.location.locality !== ""
                    ? this.context.location.locality + ", "
                    : "") +
                  (this.context.location.village !== ""
                    ? this.context.location.village + ", "
                    : "") +
                  (this.context.location.district !== ""
                    ? this.context.location.district + ", "
                    : "") +
                  (this.context.location.subDistrict !== ""
                    ? this.context.location.subDistrict + ", "
                    : "") +
                  (this.context.location.city !== ""
                    ? this.context.location.city + ", "
                    : "") +
                  (this.context.location.state !== ""
                    ? this.context.location.state + ", "
                    : "") +
                  (this.context.location.pincode !== ""
                    ? this.context.location.pincode + " "
                    : "")}
              </h6>
              <br />
              <br />
              <h6 class="p-attribute" href="#">
                Gender :-{" "}
              </h6>
              &ensp;
              <h6 class="p-value">{this.context.gender}</h6>
              <br />
              <br />
              <h6 class="p-attribute" href="#">
                Age :-{" "}
              </h6>
              &ensp;
              <h6 class="p-value">{this.context.age}</h6>
              <br />
              <br />
              <h6 class="p-attribute" href="#">
                Email :-{" "}
              </h6>
              <h6 class="p-value">{this.context.email}</h6>
              <br />
              <br />
              <h6 class="p-attribute" href="#">
                Blood Group :-{" "}
              </h6>
              &ensp;
              <h6 class="p-value">
                {this.context.bloodGroup +
                  (this.context.rhFactor === "Positive" ? "+" : "-")}
              </h6>
              <br />
              <br />
              {/* <h6 class="p-attribute" href="#">
                Rh Factor :-{" "}
              </h6>
              &ensp;
              <h6 class="p-value">{this.context.rhFactor}</h6>
              <br />
              <br /> */}
              {/*<h3 class="p-attribute" href="#">
              Last Donated on :-{" "}
            </h3>
            &ensp;
            <h3 class="p-value">{this.context.lastDonated}</h3>
            <br />
              <br/>*/}
              <h6 class="p-attribute" href="#">
                Receive Donation Request :{" "}
              </h6>
              &ensp;
              <h6 class="p-value">{this.context.reqDonor ? "Yes" : "No"}</h6>
              <br />
              <br />
            </div>
            <br />
            <br />
            <br />
          </div>
          <div class="fix-edit">
            <button
              type="button"
              class="btn btn-success edit-profile2"
              data-bs-toggle="modal"
              data-bs-target="#profileResetModal"
              onClick={() => {
                this.forceUpdate();
              }}
            >
              Edit Profile
            </button>
          </div>
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
                  <br />
                  <img
                    src={
                      this.context.gender === "Male" ? MaleAvatar : FemaleAvatar
                    }
                    class="card-img-top user-dp"
                    alt="..."
                  />
                  <br />
                  <div class="dp-choice">
                    <h3>choose</h3>
                    <img
                      src={
                        this.context.gender === "Male"
                          ? MaleAvatar
                          : FemaleAvatar
                      }
                    />
                    <img
                      src={
                        this.context.gender === "Male"
                          ? MaleAvatar2
                          : FemaleAvatar2
                      }
                    />
                    <img
                      src={
                        this.context.gender === "Male"
                          ? MaleAvatar3
                          : FemaleAvatar3
                      }
                    />
                    <img
                      src={
                        this.context.gender === "Male"
                          ? MaleAvatar4
                          : FemaleAvatar4
                      }
                    />
                  </div>
                  {/*<input class="img-change" type="file" />*/}
                  <br /> <br />
                  <div class="card-body">
                    <h3 class="card-title p-card">Profile</h3>
                    <br />
                    <div class="cardtext">
                      <h3 class="p-attribute" href="#">
                        First Name &emsp;:-&ensp;&emsp;{" "}
                      </h3>
                      <input
                        class="p-value form-control profile-modal-input1"
                        type="text"
                        value={this.state.firstName}
                        onChange={(e) => {
                          this.setState({ firstName: e.target.value });
                        }}
                      />
                      <br /> <br />
                      <h3 class="p-attribute" href="#">
                        Last Name &emsp;:-&emsp;&ensp;{" "}
                      </h3>
                      <input
                        class="p-value form-control profile-modal-input1"
                        type="text"
                        value={this.state.lastName}
                        onChange={(e) => {
                          this.setState({ lastName: e.target.value });
                        }}
                      />
                      <br /> <br />
                      <h3 class="p-attribute" href="#">
                        Address &nbsp;&emsp;&emsp;:-&emsp;&ensp;{" "}
                      </h3>
                      <input
                        class="p-value form-control profile-modal-input4"
                        type-="text"
                        value={this.state.address}
                        onChange={(e) => {
                          this.setState({ address: e.target.value });
                        }}
                      />
                      <br />
                      <br />
                      <h3 class="p-attribute" href="#">
                        Blood Group &ensp;:-&emsp;{" "}
                      </h3>
                      <select
                        class="p-value form-control profile-modal-input3"
                        value={this.state.bloodGroup}
                        onChange={(e) => {
                          this.setState({ bloodGroup: e.target.value });
                        }}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                      <br />
                      <br />
                      <h3 class="p-attribute" href="#">
                        Rh factor &emsp;&ensp;:-&emsp;&ensp;{" "}
                      </h3>
                      <select
                        class="p-value form-control profile-modal-input2"
                        value={this.state.rhFactor}
                        onChange={(e) => {
                          this.setState({ rhFactor: e.target.value });
                        }}
                      >
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                      </select>
                      <br />
                      <br />
                      <h3 class="p-attribute" href="#">
                        Receive Donation Request :-&emsp;{" "}
                      </h3>
                      <select
                        class="p-value form-control profile-modal-input5"
                        value={this.state.reqDonor}
                        onChange={(e) => {
                          this.setState({
                            reqDonor:
                              e.target.value === "true" ||
                              e.target.value === true
                                ? true
                                : false,
                          });
                        }}
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                      <br />
                      <br />
                      <hr class="hr-style"></hr>
                      <div>
                        <h4 class="profile-placepicker">Enter your address</h4>
                        <br />
                        <input
                          class="form-control profile-modal-input6"
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
