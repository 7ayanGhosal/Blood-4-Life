import React, { Component } from "react";
import "./profileSetter.css";
import UserProfile from "./userProfile/userProfile";
import HospitalProfile from "./hospitalProfile/hospitalProfile";
import PlacePicker from "./placePicker/placePicker";
import AuthContext from "../../../../context/auth-context";

class ProfileSetter extends Component {
  static contextType = AuthContext;
  state = { box: "profileSetter" };
  setProfile = (val) => {
    document.getElementById("closeProfileSetterModal").click();
    this.setState({ box: "placePicker" }, () => {
      this.context.setProfile(val);
    });
  };
  signup = (res) => {
    document.getElementById("closeSignupPlacepickerModal").click();
    this.setState({ box: "profileSetter" }, () => {
      this.context.signup(res);
    });
  };
  componentDidUpdate() {
    if (this.state.box === "placePicker") {
      document.getElementById("openSignupPlacepickerModal").click();
    }
  }
  render() {
    var box = null;
    if (this.state.box === "profileSetter") {
      if (this.context.isHospital)
        box = <HospitalProfile setProfile={this.setProfile}></HospitalProfile>;
      else box = <UserProfile setProfile={this.setProfile}></UserProfile>;
    } else if (this.state.box === "placePicker") {
      box = <PlacePicker signup={this.signup}></PlacePicker>;
    }
    return box;
  }
}

export default ProfileSetter;
