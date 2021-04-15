import React, { Component } from "react";
import "./hospital.css";
import SecondNav from "./secondNav/secondNav";
import BloodBank from "./bloodBank/bloodBank";
import UpcomingEvents from "./upcomingEvents/upcomingEvents";
import Profile from "./profile/profile";
import OrganiseCamp from "./organiseCamp/organiseCamp";
import AuthContext from "../../context/auth-context";

class Hospital extends Component {
  static contextType = AuthContext;
  // display: will take 4 values, what to diplay? 1.Profile, 2.BloodBank 3.UpcomingEvents, 4.OrganiseCamp
  state = { display: "profile" };
  displayHandler = (box) => {
    this.setState({ display: box });
  };
  render() {
    var box = <Profile></Profile>;
    if (this.state.display === "OrganiseCamp") {
      box = <OrganiseCamp></OrganiseCamp>;
    } else if (this.state.display === "BloodBank") {
      box = <BloodBank></BloodBank>;
    } else if (this.state.display === "UpcomingEvents") {
      box = <UpcomingEvents></UpcomingEvents>;
    } else {
      // box = <Profile></Profile>;
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
