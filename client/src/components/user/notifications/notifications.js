import axios from "axios";
import React from "react";
import "./notifications.css";
import AuthContext from "../../../context/auth-context";

class Notifications extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { notifications: this.props.notif };
  }
  refresh = () => {
    this.context.refreshUserNotif();
  };
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
          <div id={"notification" + i} title={i}>
            <div class={unseen}>
              <div class="card-header">
                <h4 class="n-type d-inline">
                  {this.state.notifications[i].type}
                </h4>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                  onClick={(ref) => {
                    this.context.deleteNotif(ref);
                  }}
                ></button>
              </div>
              <div class="card-body">
                <p>
                  ({this.state.notifications[i].body.date}-
                  {this.state.notifications[i].body.month}-
                  {this.state.notifications[i].body.year},{" "}
                  {this.state.notifications[i].body.hour}:
                  {this.state.notifications[i].body.min} hrs)
                </p>
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
                  {(this.state.notifications[i].body.location.poi != ""
                    ? this.state.notifications[i].body.location.poi + ", "
                    : "") +
                    (this.state.notifications[i].body.location.street != ""
                      ? this.state.notifications[i].body.location.street + ", "
                      : "") +
                    (this.state.notifications[i].body.location.subSubLocality !=
                    ""
                      ? this.state.notifications[i].body.location
                          .subSubLocality + ", "
                      : "") +
                    (this.state.notifications[i].body.location.subLocality != ""
                      ? this.state.notifications[i].body.location.subLocality +
                        ", "
                      : "") +
                    (this.state.notifications[i].body.location.locality != ""
                      ? this.state.notifications[i].body.location.locality +
                        ", "
                      : "") +
                    (this.state.notifications[i].body.location.village != ""
                      ? this.state.notifications[i].body.location.village + ", "
                      : "") +
                    (this.state.notifications[i].body.location.district != ""
                      ? this.state.notifications[i].body.location.district +
                        ", "
                      : "") +
                    (this.state.notifications[i].body.location.subDistrict != ""
                      ? this.state.notifications[i].body.location.subDistrict +
                        ", "
                      : "") +
                    (this.state.notifications[i].body.location.city != ""
                      ? this.state.notifications[i].body.location.city + ", "
                      : "") +
                    (this.state.notifications[i].body.location.state != ""
                      ? this.state.notifications[i].body.location.state + ", "
                      : "") +
                    (this.state.notifications[i].body.location.pincode != ""
                      ? this.state.notifications[i].body.location.pincode + " "
                      : "")}
                </h6>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        <div>
          <br />
          <div class="notify-cont">
            <h3 class="notifyh">Notifications</h3>
            <button class="btn n-refresh" onClick={() => this.refresh()}>
              Refresh
            </button>
            <button
              class="btn btn-secondary n-clear"
              disabled={this.state.notifications.length === 0 ? true : false}
              onClick={this.context.clearAllNotif}
            >
              Clear All
            </button>
            <br />
            <br />
            <br />
            {jsx}
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;
