import React, { Component } from "react";
import "./hospital.css";
import SecondNav from "./secondNav/secondNav";
import BloodBank from "./bloodBank/bloodBank";
import UpcomingEvents from "./upcomingEvents/upcomingEvents";
import Profile from "./profile/profile";
import OrganiseCamp from "./organiseCamp/organiseCamp";
import AuthContext from "../../context/auth-context";
import axios from "axios";

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
    if (this.state.display === "OrganiseCamp") {
      box = <OrganiseCamp></OrganiseCamp>;
    } else if (this.state.display === "BloodBank") {
      box = <BloodBank></BloodBank>;
    } else if (this.state.display === "UpcomingEvents") {
      // Get the event details
      axios.get("/hospital/getEvents/" + this.state.email).then(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
      box = <UpcomingEvents></UpcomingEvents>;
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
