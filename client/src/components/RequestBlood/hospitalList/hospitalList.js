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
    var jsx2 = [];

    if (this.props.details.rhFactor === "Positive") {
      this.props.details.rhFactor = "+";
    } else if (this.props.details.rhFactor === "Negative") {
      this.props.details.rhFactor = "-";
    }
    if (this.props.dispState === 2) {
      this.props.list.forEach((ele, slno) => {
        jsx2.push(
          <tr>
            <th scope="row">{slno + 1}</th>
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
      });
    } else if (this.props.dispState === 3) {
      // document.getElementById("listMessage").onclick = () => {
      //   console.log("Ami Kaaj Korchi!!!");
      // };
    }
    return (
      <div>
        <div id="listMessage"></div>
        {this.props.dispState === 2 ? (
          <table class="table table-bordered table-light hover m-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email id</th>
                <th scope="col">Address</th>
                <th scope="col">Distance</th>
              </tr>
            </thead>
            <tbody>{jsx2}</tbody>
          </table>
        ) : null}

        {this.props.dispState === 3 ? (
          <div>
            <h5>
              No hospital found in given range, please increase your search
              range
            </h5>
            <br />
            <h5>or...</h5>
            <br />
            <h5 class="d-inline">
              Mail all donors within <b>{this.state.maxDistance} KM </b> {"=>"}
            </h5>
            <button class="d-inline" id="userMail">
              Mail Potential Donors
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default HospitalList;
