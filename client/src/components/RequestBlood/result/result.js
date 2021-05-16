import React from "react";
import "./result.css";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlyAvailable: false,
    };
  }
  componentDidMount() {
    document.getElementById("reqList").scrollIntoView();
  }
  componentDidUpdate() {
    document.getElementById("reqList").scrollIntoView();
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
              {(ele.location.poi != "" ? ele.location.poi + ", " : "") +
                (ele.location.street != "" ? ele.location.street + ", " : "") +
                (ele.location.subSubLocality != ""
                  ? ele.location.subSubLocality + ", "
                  : "") +
                (ele.location.subLocality != ""
                  ? ele.location.subLocality + ", "
                  : "") +
                (ele.location.locality != ""
                  ? ele.location.locality + ", "
                  : "") +
                (ele.location.village != ""
                  ? ele.location.village + ", "
                  : "") +
                (ele.location.district != ""
                  ? ele.location.district + ", "
                  : "") +
                (ele.location.subDistrict != ""
                  ? ele.location.subDistrict + ", "
                  : "") +
                (ele.location.city != "" ? ele.location.city + ", " : "") +
                (ele.location.state != "" ? ele.location.state + ", " : "") +
                (ele.location.pincode != "" ? ele.location.pincode + " " : "")}
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
      <div id="reqList" className="mb-3 p-3 useremerlist main-div-urslst">
        <h4>Search Results:-</h4>
        {this.props.dispState === 2 ? (
          <div>
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
          </div>
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
              Mail all donors within <b>{this.props.details.maxDistance} KM </b>{" "}
              {"=>"}
            </h5>
            <button
              onClick={this.props.mailUsers}
              class="d-inline btn btn-warning m-1"
              id="userMail"
            >
              Mail Potential Donors
            </button>
          </div>
        ) : null}
        {this.props.dispState === 4 ? (
          <div>
            <h5>Couldn't Mail Any Suitable Donor!!</h5>
            <h5>Please Increase Your Search Range</h5>
          </div>
        ) : null}

        {this.props.dispState === 5 ? (
          <div>
            <h5>We Have Successfully Informed {this.props.count} Donors</h5>
            <h5>Please Wait For Their Response</h5>
            <h5>Or, Increase The Search Range For More Hospitals.</h5>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Result;
