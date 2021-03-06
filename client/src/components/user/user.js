import React, { Component } from "react";
import "./user.css";
import Profile from "./profile/profile";
import Notifications from "./notifications/notifications";
import Events from "./upcomingEvents/upcomingEvents";

class User extends Component {
  render() {
    var box = <Profile></Profile>;
    if (this.props.display === "UpcomingEvents") {
      box = <Events></Events>;
    } else if (this.props.display === "Notifications") {
      box = <Notifications notif={this.props.notif}></Notifications>;
    } else {
      box = <Profile></Profile>;
    }
    return <div>{box}</div>;
  }
}

export default User;
