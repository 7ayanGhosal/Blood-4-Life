import React from "react";
import axios from "axios";
import PlacePicker from "./placePicker/placePicker";
import "./emergency.css";
import HospitalList from "./hospitalList/hospitalList";

class Emergency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Hospitals: [],
      dispState: 1, // 1. default, 2. found Hosp 3. No Hosp
      details: {
        name: "",
        contact: "",
        bloodGroup: "",
        rhFactor: "",
      },
    };
    this.hospSearch = (data) => {
      axios.post("/emergency", data).then(
        (Res) => {
          // console.log(Res);
          this.setState(
            {
              details: {
                name: data.details.name,
                contact: data.details.contact,
                bloodGroup: data.details.bloodGroup,
                rhFactor: data.details.rhFactor,
              },
              Hospitals: Res.data,
            },
            () => {
              if (Res.data.length === 0) {
                this.setState({ dispState: 3 });
              } else {
                this.setState({ dispState: 2 });
              }
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    };
  }
  render() {
    return (
      <div>
        <PlacePicker hospSearch={this.hospSearch}></PlacePicker>
        {this.state.dispState !== 1 ? (
          <HospitalList
            list={this.state.Hospitals}
            details={this.state.details}
            dispState={this.state.dispState}
          ></HospitalList>
        ) : null}
      </div>
    );
  }
}

export default Emergency;
