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
      dispState: 1, //1: Default, 2: Hospitals Found, 3: Display User Button, 4: Change Range
      details: {
        name: "",
        contact: "",
        bloodGroup: "",
        rhFactor: "",
      },
    };
    this.hospSearch = (data) => {
      axios.post("/requestBlood/hospitals", data).then(
        (Res) => {
          // console.log(Res);
          this.setState(
            {
              details: {
                name: data.details.name,
                contact: data.details.contact,
                bloodGroup: data.details.bloodGroup,
                rhFactor: data.details.rhFactor,
                maxDistance: data.details.maxDistance,
              },
            },
            () => {
              if (Res.data.length === 0) {
                // axios.post("/requestBlood/user", data).then((res) => {
                //   if (res.data.length === 0)
                //     document.getElementById("listMessage").innerText =
                //       "No hospital or donor exists in the given range, please increase the range";
                //   else {
                //     document.getElementById("listMessage").innerText =
                //       "No hospitals found in the given range with necessary blood type, showing a list of willing donors in the range";
                //     this.setState({ Hospitals: res.data });
                //   }
                // });
                this.setState({ dispState: 3 });
              } else {
                this.setState({ Hospitals: Res.data, dispState: 2 });
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
    var box = null;
    if (this.state.dispState !== 1) {
      box = (
        <HospitalList
          list={this.state.Hospitals}
          details={this.state.details}
          dispState={this.state.dispState}
        ></HospitalList>
      );
    }
    return (
      <div>
        <h5>Make A Blood Request From Other Hospitals</h5>
        <p>(Send Request To Users If Not Available In Hospitals)</p>
        <PlacePicker hospSearch={this.hospSearch}></PlacePicker>
        {box}
      </div>
    );
  }
}

export default RequestBlood;
