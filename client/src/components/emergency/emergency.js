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
          this.setState({
            details: {
              name: data.details.name,
              contact: data.details.contact,
              bloodGroup: data.details.bloodGroup,
              rhFactor: data.details.rhFactor,
            },
            Hospitals: Res.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    };
  }
  render() {
    var box = (
      <HospitalList
        list={this.state.Hospitals}
        details={this.state.details}
      ></HospitalList>
    );
    return (
      <div>
        <h1>Emergency</h1>
        <PlacePicker hospSearch={this.hospSearch}></PlacePicker>
        {box}
      </div>
    );
  }
}

export default Emergency;
