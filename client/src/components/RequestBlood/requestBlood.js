import React from "react";
import axios from "axios";
import PlacePicker from "./placePicker/placePicker";
import "./requestBlood.css";
import HospitalList from "./hospitalList/hospitalList";

class RequestBlood extends React.Component {
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
        <h5>Make A Blood Request From Other Hospitals</h5>
        <p>(Or Send Request To Users If Not Available In Hospitals)</p>
        <PlacePicker hospSearch={this.hospSearch}></PlacePicker>
        {box}
      </div>
    );
  }
}

export default RequestBlood;
