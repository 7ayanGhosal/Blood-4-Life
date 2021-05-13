import React, { Component } from "react";
import "./hospital.css";
import BloodBank from "./bloodBank/bloodBank";
import UpcomingEvents from "./upcomingEvents/upcomingEvents";
import OrganiseCamp from "./organiseCamp/organiseCamp";
import AuthContext from "../../context/auth-context";

class Hospital extends Component {
  static contextType = AuthContext;

  render() {
    var box = null;
    if (this.props.display === "OrganiseCamp") {
      box = <OrganiseCamp></OrganiseCamp>;
    } else if (this.props.display === "BloodBank") {
      box = <BloodBank></BloodBank>;
    } else if (this.props.display === "UpcomingEvents") {
      // Get the event details
      box = <UpcomingEvents></UpcomingEvents>;
    }

    return <div>{box}</div>;
  }
}

export default Hospital;
