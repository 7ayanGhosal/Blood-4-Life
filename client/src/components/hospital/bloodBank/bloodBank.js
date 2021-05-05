import React, { Component } from "react";
import "./bloodBank.css";
import AuthContext from "../../../context/auth-context";

class BloodBank extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      bloodStock: {
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "AB+": 0,
        "AB-": 0,
        "O+": 0,
        "O-": 0,
      },
    };
    this.updateStock = () => {
      this.context.updateStock(this.state);
    };
  }
  componentDidMount() {
    this.setState({ ...this.context });
  }
  render() {
    return (
      <div class="bb-bg">
        <div class="container ">
          <center>
            <h1 class="bb-h">Blood Bank Archive</h1>
            <br />
            <div class="row">
              <div class="col-sm">
                <div class="col-name">
                  <p class="text1">
                    <h2 class="rhfactor">Rh Positive</h2>
                  </p>
                </div>{" "}
                <br></br>
                <h4 class="blood-text">
                  A+&ensp;&ensp;{" "}
                  <input
                    class="form-control bb-modal-input"
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["A+"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["A+"] = parseInt(e.target.value, 10);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </h4>
                <br></br>
                <h4 class="blood-text">
                  B+&ensp;&ensp;{" "}
                  <input
                    class="form-control bb-modal-input"
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["B+"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["B+"] = parseInt(e.target.value, 10);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </h4>
                <br></br>
                <h4 class="blood-text">
                  AB+&ensp;{" "}
                  <input
                    class="form-control bb-modal-input"
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["AB+"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["AB+"] = parseInt(e.target.value, 10);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </h4>
                <br></br>
                <h4 class="blood-text">
                  O+&ensp;&ensp;{" "}
                  <input
                    class="form-control bb-modal-input"
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["O+"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["O+"] = parseInt(e.target.value, 10);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </h4>
                <br></br>
              </div>
              <div class="col-sm">
                <div class="col-name">
                  <p class="text1">
                    <h2 class="rhfactor">Rh Negative</h2>
                  </p>
                </div>{" "}
                <br></br>
                <h4 class="blood-text">
                  A-&ensp;&ensp;{" "}
                  <input
                    class="form-control bb-modal-input"
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["A-"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["A-"] = parseInt(e.target.value, 10);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </h4>
                <br></br>
                <h4 class="blood-text">
                  B-&ensp;&ensp;{" "}
                  <input
                    class="form-control bb-modal-input"
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["B-"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["B-"] = parseInt(e.target.value, 10);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </h4>
                <br></br>
                <h4 class="blood-text">
                  AB-&ensp;{" "}
                  <input
                    class="form-control bb-modal-input"
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["AB-"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["AB-"] = parseInt(e.target.value, 10);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </h4>
                <br></br>
                <h4 class="blood-text">
                  O-&ensp;&ensp;{" "}
                  <input
                    class="form-control bb-modal-input"
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["O-"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["O-"] = parseInt(e.target.value, 10);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </h4>
                <br></br>
              </div>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default BloodBank;
