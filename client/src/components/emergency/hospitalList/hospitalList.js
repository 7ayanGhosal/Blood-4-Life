import React from "react";
import "./hospitalList.css";
class HospitalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDistance: 200,
      onlyAvailable: false,
    };
  }
  render() {
    var hospListjsx = [];
    var rhFactor = "";

    if (
      this.props.details.bloodGroup === "" ||
      this.props.details.rhFactor === ""
    ) {
      this.props.details.bloodGroup = "";
      this.props.details.rhFactor = "";
    }

    if (this.props.details.rhFactor === "Positive") {
      this.props.details.rhFactor = "+";
    } else if (this.props.details.rhFactor === "Negative") {
      this.props.details.rhFactor = "-";
    }
    this.props.list.forEach((ele, slno) => {
      var available = false;
      var bloodGroup =
        this.props.details.bloodGroup + this.props.details.rhFactor;
      if (ele.bloodStock[bloodGroup] > 0) {
        available = true;
      }
      if (
        (!this.state.onlyAvailable || available) &&
        parseFloat(ele.distance, 10) <= this.state.maxDistance
      ) {
        hospListjsx.push(
          <tr>
            <td>{ele.distance}</td>
            <td>{available ? "Yes" : "No"}</td>
            <td>{ele.name}</td>
            <td>{ele.email}</td>
            <td>
              {ele.location.poi +
                ", " +
                ele.location.street +
                ", " +
                ele.location.subSubLocality +
                ", " +
                ele.location.subLocality +
                ", " +
                ele.location.locality +
                ", " +
                ele.location.village +
                ", " +
                ele.location.district +
                ", " +
                ele.location.subDistrict +
                ", " +
                ele.location.city +
                ", " +
                ele.location.state +
                ", " +
                ele.location.pincode}
            </td>
          </tr>
        );
      }
    });
    return (
      <div class="main-div ">
        <div class="filters">
        <div> 
          <h4>Filter by: </h4>
          <div class="d-inline">
          <label for="customRange3" class="form-label distance_txt">
            <b> Max Distance ( {this.state.maxDistance} KM)</b>
          </label>
          <input
            type="range"
            class="form-range w-50"
            min="20"
            max="200"
            step="20"
            id="customRange3"
            value={this.state.maxDistance}
            onChange={(e) =>
              this.setState({ maxDistance: parseInt(e.target.value, 10) })
            }
          ></input>
          </div>
       <div>
          <div class="form-check form-switch d-inline-block">
            <label
              class="form-check-label blood_font"
              for="flexSwitchCheckDefault"
            >
              <b>
                Blood Type {this.props.details.bloodGroup}{" "}
                {this.props.details.rhFactor} availability
              </b>
            </label>
            
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              disabled={this.props.details.bloodGroup === "" ? true : false}
              checked={this.state.onlyAvailable}
              onChange={(e) => {
                this.setState({ onlyAvailable: e.target.checked });
              }}
            />
          </div>
          
        </div>

          </div>
          
        </div>
        <pre class="hospitalList">
          <table class="table table-bordered table-light hover m-auto">
            <thead>
              <tr class="table-info">
                <th scope="col">Distance</th>
                <th scope="col">Availability</th>
                <th scope="col">Name</th>
                <th scope="col">Email id</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>{hospListjsx}</tbody>
          </table>
        </pre>
      </div>
    );
  }
}

export default HospitalList;
