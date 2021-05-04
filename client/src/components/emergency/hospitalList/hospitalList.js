import React from "react";

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
            <th scope="row">{slno + 1}</th>
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
            <td>{ele.distance}</td>
          </tr>
        );
      }
    });
    return (
      <div>
        <h5>Filter by: </h5>
        <label for="customRange3" class="form-label">
          Max Distance ( {this.state.maxDistance} KM)
        </label>
        <input
          type="range"
          class="form-range w-75"
          min="20"
          max="200"
          step="20"
          id="customRange3"
          value={this.state.maxDistance}
          onChange={(e) =>
            this.setState({ maxDistance: parseInt(e.target.value, 10) })
          }
        ></input>
        <div class="form-check form-switch">
          <label class="form-check-label" for="flexSwitchCheckDefault">
            Blood Type {this.props.details.bloodGroup}{" "}
            {this.props.details.rhFactor} availability
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
        <table class="table table-bordered table-light hover m-auto">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Availability</th>
              <th scope="col">Name</th>
              <th scope="col">Email id</th>
              <th scope="col">Address</th>
              <th scope="col">Distance</th>
            </tr>
          </thead>
          <tbody>{hospListjsx}</tbody>
        </table>
      </div>
    );
  }
}

export default HospitalList;
