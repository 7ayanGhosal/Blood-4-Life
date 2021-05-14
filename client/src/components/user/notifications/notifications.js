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
          <br />
          <h4 class="n-type">{this.state.notifications[i].type}</h4>
          <br />
          <h5>
            <div class="ntemp">Required Blood Type :&ensp;</div>
            <div class="blood-type">
              {this.state.notifications[i].body.bloodGroup}
              {this.state.notifications[i].body.rhFactor === "Positive"
                ? "+"
                : "-"}
            </div>
          </h5>
          <h6>
            <div class="ntemp">Address :&ensp;</div>{" "}
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
          </h6>
          <hr />
        </div>
      );
    }

    return (
      <div>
        <div class="notify-bg">
          <br />
          <div class="notify-cont">
            <h3 class="notifyh">Notifications</h3>
            {jsx}
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;
