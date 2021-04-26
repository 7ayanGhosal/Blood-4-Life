import React from "react";
import AuthContext from "../../../context/auth-context";
import "./profile.css";

class Profile extends React.Component {
  static contextType = AuthContext;
  state = { ...this.context, close: "closeProfileResetModal" };
  onFormSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);
    this.context.resetProfile(this.state);
  };
  render() {
    console.log("XXXXXXXXXXX");
    console.log(this.context.reqDonor);
    console.log(typeof this.context.reqDonor);
    return (
      <div>
        <div class="card-body">
          <h4 class="card-title">Profile Details</h4>
          <br />
          <div class="card-text">
            <h3 class="attribute" href="#">
              Name :-{" "}
            </h3>
            &ensp;
            <h3 class="value">
              {this.context.firstName + " " + this.context.lastName}
            </h3>
            <br />
            <h3 class="attribute" href="#">
              Gender :-{" "}
            </h3>
            &ensp;
            <h3 class="value">{this.context.gender}</h3>
            <br />
            <h3 class="attribute" href="#">
              Age :-{" "}
            </h3>
            &ensp;
            <h3 class="value">{this.context.age}</h3>
            <br />
            <h3 class="attribute" href="#">
              Email :-{" "}
            </h3>
            <h3 class="value">{this.context.email}</h3>
            <br />
            <h3 class="attribute" href="#">
              Address :-{" "}
            </h3>
            &ensp;
            <h3 class="value">{this.context.address}</h3>
            <br />
            <h3 class="attribute" href="#">
              Blood Group :-{" "}
            </h3>
            &ensp;
            <h3 class="value">{this.context.bloodGroup}</h3>
            <br />
            <h3 class="attribute" href="#">
              Rh Factor :-{" "}
            </h3>
            &ensp;
            <h3 class="value">{this.context.rhFactor}</h3>
            <br />
            <h3 class="attribute" href="#">
              Last Donated on :-{" "}
            </h3>
            &ensp;
            <h3 class="value">{this.context.lastDonated}</h3>
            <br />
            <h3 class="attribute" href="#">
              Receive Donation Request :{" "}
            </h3>
            &ensp;
            <h3 class="value">{this.context.reqDonor}</h3>
            <br />
          </div>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#profileResetModal"
        >
          Edit Profile
        </button>
        <div
          class="modal fade"
          id="profileResetModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabe"
          aria-hidden="true"
        >
          <form
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-new2"
            onSubmit={this.onFormSubmit}
          >
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title" id="exampleModalLabel">
                  Edit Profile
                </h2>
                <button
                  id="closeProfileResetModal"
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="card w-100" style={{ width: 18 + "rem" }}>
                  <img
                    src="https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
                    class="card-img-top"
                    alt="..."
                  />
                  <input class="img-change" type="file" />
                  <br /> <br />
                  <div class="card-body">
                    <h4 class="card-title">Profile</h4>
                    <div class="card-text">
                      <h3 class="attribute" href="#">
                        First Name :-{" "}
                      </h3>
                      <input
                        class="value"
                        type="text"
                        value={this.state.firstName}
                        onChange={(e) => {
                          this.setState({ firstName: e.target.value });
                        }}
                      />
                      <br /> <br />
                      <h3 class="attribute" href="#">
                        Last Name :-{" "}
                      </h3>
                      <input
                        class="value"
                        type="text"
                        value={this.state.lastName}
                        onChange={(e) => {
                          this.setState({ lastName: e.target.value });
                        }}
                      />
                      <br /> <br />
                      <h3 class="attribute" href="#">
                        Address :-{" "}
                      </h3>
                      <input
                        class="value"
                        type-="text"
                        value={this.state.address}
                        onChange={(e) => {
                          this.setState({ address: e.target.value });
                        }}
                      />
                      <br />
                      <br />
                      <h3 class="attribute" href="#">
                        Blood Group :-{" "}
                      </h3>
                      <select
                        class="value"
                        value={this.state.bloodGroup}
                        onChange={(e) => {
                          this.setState({ bloodGroup: e.target.value });
                        }}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                      <br />
                      <br />
                      <h3 class="attribute" href="#">
                        Rh factor :-{" "}
                      </h3>
                      <select
                        class="value"
                        value={this.state.rhFactor}
                        onChange={(e) => {
                          this.setState({ rhFactor: e.target.value });
                        }}
                      >
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                      </select>
                      <br />
                      <br />
                      <h3 class="attribute" href="#">
                        Receive Donation Request :-{" "}
                      </h3>
                      <select
                        class="value"
                        value={this.state.reqDonor}
                        onChange={(e) => {
                          this.setState({ reqDonor: e.target.value });
                        }}
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
