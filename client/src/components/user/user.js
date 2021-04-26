import React, { Component } from "react";
import "./user.css";
import SecondNav from "./secondNav/secondNav";
import Profile from "./profile/profile";
import Notifications from "./notifications/notifications";
import Events from "./upcomingEvents/upcomingEvents";
import AuthContext from "../../context/auth-context";

class Hospital extends Component {
  static contextType = AuthContext;
  // display: will take 4 values, what to diplay? 1.Profile, 2.BloodBank 3.UpcomingEvents, 4.OrganiseCamp
  state = { display: "Profile" };
  displayHandler = (display) => {
    this.setState((prevState, props) => {
      document.getElementById(prevState.display).classList.remove("Active");
      document.getElementById(display).classList.add("Active");
      return { display: display };
    });
  };
  render() {
    var box = <Profile></Profile>;
    if (this.state.display === "UpcomingEvents") {
      box = <Events></Events>;
    } else if (this.state.display === "Notifications") {
      box = <Notifications></Notifications>;
    } else {
      box = <Profile></Profile>;
    }
    return (
      <div>
        <SecondNav displayHandler={this.displayHandler}></SecondNav>
        {box}
      </div>
    );
  }
}

export default Hospital;
