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
      loading: true,
    };
    this.stopLoader = () => {
      this.setState({ loading: false });
    };

    this.hospSearch = (data) => {
      this.setState({ dispState: 1, loading: true }, () => {
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
      });
    };
  }
  render() {
    return (
      <div>
        <PlacePicker hospSearch={this.hospSearch}></PlacePicker>
        {this.state.dispState !== 1 && this.state.loading ? (
          <div id="EmerListLoader">
            <div class="d-flex justify-content-center text-danger mb-3 p-3 main-div-urslst useremerlist">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.dispState !== 1 ? (
          <HospitalList
            list={this.state.Hospitals}
            details={this.state.details}
            dispState={this.state.dispState}
            stopLoader={this.stopLoader}
          ></HospitalList>
        ) : null}
      </div>
    );
  }
}

export default Emergency;
