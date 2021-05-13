import axios from "axios";
import React from "react";
import "./notifications.css";
import AuthContext from "../../../context/auth-context";

class Notifications extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { notifications: [] };

    setInterval(() => {
      axios
        .get(
          "/getNotifications/" + this.context.token + "/" + this.context.email
        )
        .then((res) => {
          console.log(res);
          this.setState({ notifications: res.data });
        });
    }, 5000);
  }

  render() {
    var jsx = [];

    for (var i = 0; i < this.state.notifications.length; i++) {
      jsx.push(
        <div>
          <h5>{this.state.notifications[i].type}</h5>
          <h5>
            Required BloodType: {this.state.notifications[i].body.bloodGroup}
            {this.state.notifications[i].body.rhFactor === "Positive"
              ? "+"
              : "-"}
          </h5>
          <h5>
            Address:{" "}
            {this.state.notifications[i].body.location.poi +
              ", " +
              this.state.notifications[i].body.location.street +
              ", " +
              this.state.notifications[i].body.location.subSubLocality +
              ", " +
              this.state.notifications[i].body.location.subLocality +
              ", " +
              this.state.notifications[i].body.location.locality +
              ", " +
              this.state.notifications[i].body.location.village +
              ", " +
              this.state.notifications[i].body.location.district +
              ", " +
              this.state.notifications[i].body.location.subDistrict +
              ", " +
              this.state.notifications[i].body.location.city +
              ", " +
              this.state.notifications[i].body.location.state +
              ", " +
              this.state.notifications[i].body.location.pincode}
          </h5>
          <hr />
        </div>
      );
    }

    return (
      <div>
        <h3>Notifications</h3>
        {jsx}
      </div>
    );
  }
}

export default Notifications;
