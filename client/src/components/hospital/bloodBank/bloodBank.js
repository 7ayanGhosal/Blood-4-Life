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
      <div class="back">
        <div class="container">
          <center>
            <h1>Blood Bank Archive</h1>
            <div class="row">
              <div class="col-sm">
                <div class="col-name">
                  <p class="text1">
                    <h2 class="rhfactor">Rh Positive</h2>
                  </p>
                </div>{" "}
                <br></br>
                <p class="text">
                  A+{" "}
                  <input
                    type="number"
                    name="OTP"
                    min="0"
                    max="99999"
                    value={this.state.bloodStock["A+"]}
                    onChange={(e) => {
                      var BloodStock = this.state.bloodStock;
                      BloodStock["A+"] = parseInt(e.target.value, 10);
                      // console.log(typeof BloodStock["A+"]);
                      this.setState({
                        bloodStock: BloodStock,
                      });
                      this.updateStock();
                    }}
                  />
                </p>
                <br></br>
                <p class="text">
                  B+{" "}
                  <input
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
                </p>
                <br></br>
                <p class="text">
                  AB+{" "}
                  <input
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
                </p>
                <br></br>
                <p class="text">
                  O+{" "}
                  <input
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
                </p>
                <br></br>
              </div>
              <div class="col-sm">
                <div class="col-name">
                  <p class="text1">
                    <h2 class="rhfactor">Rh Negative</h2>
                  </p>
                </div>{" "}
                <br></br>
                <p class="text">
                  A-{" "}
                  <input
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
                </p>
                <br></br>
                <p class="text">
                  B-{" "}
                  <input
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
                </p>
                <br></br>
                <p class="text">
                  AB-{" "}
                  <input
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
                </p>
                <br></br>
                <p class="text">
                  O-{" "}
                  <input
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
                </p>
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
