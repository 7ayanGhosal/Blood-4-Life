import React from "react";
import axios from "axios";
import PlacePicker from "./placePicker/placePicker";
import "./emergency.css";
import HospitalList from "./hospitalList/hospitalList";

class Emergency extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Hospitals: [] };
    this.hospSearch = (data) => {
      axios.post("/emergency", data).then(
        (Res) => {
          this.setState({ Hospitals: Res.data });
        },
        (err) => {
          console.log(err);
        }
      );
    };
  }
  render() {
    var box = <HospitalList list={this.state.Hospitals}></HospitalList>;
    return (
      <div>
        <h1>Emergency</h1>
        <PlacePicker hospSearch={this.hospSearch}></PlacePicker>
        {/* <div>
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
        </div> */}
        {box}
      </div>
    );
  }
}

export default Emergency;
