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
  componentDidMount() {
    this.setState({ notifications: this.context.notifications });
  }
  render() {
    var jsx = [];
    if (this.state.notifications.length === 0) {
      jsx.push(
        <div>
          <h5>Nothing to show!</h5>
        </div>
      );
    } else {
      var unseen;
      for (var i = this.state.notifications.length - 1; i >= 0; i--) {
        if (i >= this.context.seen) {
          unseen = "unseen";
        } else {
          unseen = "seen";
        }

        jsx.push(
          <div class={unseen}>
            <h4 class="n-type">{this.state.notifications[i].type}</h4>
            <p>
              ({this.state.notifications[i].body.date}-
              {this.state.notifications[i].body.month}-
              {this.state.notifications[i].body.year},{" "}
              {this.state.notifications[i].body.hour}:
              {this.state.notifications[i].body.min} hrs)
            </p>
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
          </div>
        );
      }
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
