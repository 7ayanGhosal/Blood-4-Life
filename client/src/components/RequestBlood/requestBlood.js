import React from "react";
import axios from "axios";
import PlacePicker from "./placePicker/placePicker";
import "./requestBlood.css";
import Result from "./result/result";

class RequestBlood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Hospitals: [],
      count: 0,
      dispState: 1, //1: Default, 2: Hospitals Found, 3: Display User Button, 4: Change Range, 5: Found User
      details: {
        name: "",
        contact: "",
        bloodGroup: "",
        rhFactor: "",
        maxDistance: 200,
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
              location: data.location,
            },
            () => {
              if (Res.data.length === 0) {
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

    this.mailUsers = () => {
      axios
        .post("/requestBlood/user", {
          details: this.state.details,
          location: this.state.location,
        })
        .then((res) => {
          if (res.data.count === 0) {
            this.setState({ dispState: 4 });
          } else {
            this.setState({ dispState: 5, count: res.data.count });
          }
        });
    };
  }
  render() {
    return (
      <div>
        <h5>Make A Blood Request From Other Hospitals</h5>
        <p>(Send Request To Users If Not Available In Hospitals)</p>
        <PlacePicker hospSearch={this.hospSearch}></PlacePicker>
        {this.state.dispState !== 1 ? (
          <Result
            list={this.state.Hospitals}
            details={{ ...this.state.details }}
            dispState={this.state.dispState}
            count={this.state.count}
            mailUsers={this.mailUsers}
          ></Result>
        ) : null}
      </div>
    );
  }
}

export default RequestBlood;
