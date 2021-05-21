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
      box = <BloodBank key={Math.floor(Math.random() * 1000)}></BloodBank>;
    } else if (this.props.display === "UpcomingEvents") {
      box = <UpcomingEvents></UpcomingEvents>;
    }

    return <div>{box}</div>;
  }
}

export default Hospital;
