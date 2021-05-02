import React from "react";
import PlacePicker from "./placePicker/placePicker";
import "./emergency.css";

class Emergency extends React.Component {
  render() {
    return (
      <div>
        <h1>Emergency</h1>
        <PlacePicker></PlacePicker>
        <div>
          <div class="card">
            <div class="card-body">
              <h3 class="e-attribute" href="#">
                Hospital Name :-
              </h3>
              &ensp;&ensp;
              <h3 class="e-value">PS's hospital</h3>
              <br />
              <br />
              <h3 class="e-attribute" href="#">
                Distance :
              </h3>
              &ensp;&ensp;
              <h3 class="e-value">3 km</h3>
              <br />
              <br />
              <h3 class="e-attribute" href="#">
                Address :-
              </h3>
              &ensp;&ensp;
              <h3 class="e-value">Kolkata</h3>
              <br />
              <br />
              <h3 class="e-attribute" href="#">
                Contact :-
              </h3>
              &ensp;&ensp;
              <h3 class="e-value">99XXXXXX04</h3>
              <br />
              <br />
              <h3 class="e-attribute" href="#">
                Your blood type availability :-
              </h3>
              &ensp;&ensp;
              <span class="e-value tick">&#10003;</span>
              &emsp;
              <h4 class="e-value wrong">X</h4>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Emergency;
