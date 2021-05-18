import React from "react";
import "./result.css";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlyAvailable: false,
      display: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      document.getElementById("ResultLoader").scrollIntoView();
      this.props.stopLoader();
      this.setState({ display: true });
    }, 1500);
  }

  // componentDidUpdate() {
  //   document.getElementById("reqList").scrollIntoView();
  // }
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
    return this.state.display ? (
      <div id="reqList" className="mb-3 p-3 useremerlist main-div-urslst">
        <div class="card hsr-card">
          <div class="card-header">
            <h3 class="h-result">Search Results :-</h3>
          </div>
          <div class="card-body">
            {this.props.dispState === 2 ? (
              <div>
                <pre class="hsr-list">
                  <table class="table table-bordered hsr-card hover m-auto">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email id</th>
                        <th scope="col">Address</th>
                        <th scope="col">Distance(in KM)</th>
                      </tr>
                    </thead>
                    <tbody>{jsx2}</tbody>
                  </table>
                </pre>
              </div>
            ) : null}
            {this.props.dispState === 3 ? (
              <div>
                <h4 class="hsr-temp">No hospital found in given range. </h4>
                <br />
                <h5 class="hsr-temp2 hsr-temp3">
                  Please increase your search range
                </h5>
                <br />
                <h5 class="hsr-temp3">Or...</h5>
                <br />
                <center>
                  <h5 class="d-inline hsr-temp2">
                    Mail all donors within{" "}
                    <b>{this.props.details.maxDistance} KM </b> {"  =>"}
                  </h5>
                  &ensp;
                  <button
                    onClick={this.props.mailUsers}
                    class="d-inline btn btn-warning m-1"
                    id="userMail"
                  >
                    Mail Potential Donors
                  </button>
                </center>
              </div>
            ) : null}
            {this.props.dispState === 4 ? (
              <div>
                <center>
                  <h5>
                    <b>Couldn't Mail Any Suitable Donor!!</b>
                  </h5>
                  <br />
                  <h5>Please Increase Your Search Range</h5>
                </center>
              </div>
            ) : null}

            {this.props.dispState === 5 ? (
              <div>
                <h4>
                  We Have Successfully Informed <b>{this.props.count}</b> Donors
                </h4>
                <br />
                <center>
                  <h5>Please Wait For Their Response</h5>
                  <h5>Or</h5>
                  <h5>Increase The Search Range For More Hospitals.</h5>
                </center>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Result;
