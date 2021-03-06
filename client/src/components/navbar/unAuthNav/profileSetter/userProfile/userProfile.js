import React, { Component } from "react";
import "./userProfile.css";
import AuthContext from "../../../../../context/auth-context";

class UserProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    age: 0,
    gender: "Male",
    bloodGroup: "A",
    rhFactor: "Negative",
    reqDonor: false,
  };
  static contextType = AuthContext;

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.setProfile(this.state);
  };
  reset = () => {
    this.setState({
      firstName: "",
      lastName: "",
      age: 0,
      gender: "Male",
      bloodGroup: "A",
      rhFactor: "Negative",
      reqDonor: false,
    });
    this.context.remove();
  };
  render() {
    return (
      <div>
        <button
          id="profileSetterModalButton"
          type="button"
          class="btn navbar-custom text-align-center pe-4 ps-4 icons2 d-none"
          data-bs-toggle="modal"
          data-bs-target="#profileSetterModal"
        ></button>

        <div
          class="modal fade"
          id="profileSetterModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabe"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-new2">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title psh" id="exampleModalLabel">
                  Profile Details
                </h3>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeProfileSetterModal"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={this.onFormSubmit}>
                  <div
                    class="card w-100 ps-bos-bg"
                    style={{ width: 18 + "rem" }}
                  />
                  <div class="card w-100">
                    <div class="card-body profile-bg">
                      <h4 class="card-title">Profile</h4>
                      <h4 class="card-text ucard">
                        <h4 class="p-value">First Name :&ensp;</h4>
                        <input
                          class="p-value form-control up-modal-input"
                          placeholder=" Enter your first name "
                          type="text"
                          name="firstName"
                          required
                          value={this.state.firstName}
                          onChange={(e) => {
                            this.setState({ firstName: e.target.value });
                          }}
                        />
                        <br /> <br />
                        <h4 class="p-value">Last Name :&ensp;</h4>
                        <input
                          class="p-value form-control up-modal-input"
                          placeholder=" Enter your Last name "
                          type="text"
                          name="lastName"
                          required
                          value={this.state.lastName}
                          onChange={(e) => {
                            this.setState({ lastName: e.target.value });
                          }}
                        />
                        <br /> <br />
                        <h4 class="p-value">Gender :&ensp;</h4>
                        <select
                          class="p-value form-control up-modal-input"
                          name="gender"
                          required
                          value={this.state.gender}
                          onChange={(e) => {
                            this.setState({ gender: e.target.value });
                          }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <br />
                        <br />
                        <h4 class="p-value"> Age :&ensp;</h4>
                        <input
                          class="p-value form-control up-modal-input"
                          placeholder=" Enter your age "
                          type="number"
                          name="age"
                          required
                          value={this.state.age}
                          onChange={(e) => {
                            this.setState({ age: e.target.value });
                          }}
                        />
                        <br /> <br />
                        <h4 class="p-value">Blood Group :&ensp;</h4>
                        <select
                          class="p-value form-control up-modal-input"
                          name="bloodGroup"
                          required
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
                        <br /> <br />
                        <h4 class="p-value">Rh factor :&ensp;</h4>
                        <select
                          class="p-value form-control up-modal-input"
                          name="rhFactor"
                          required
                          value={this.state.rhFactor}
                          onChange={(e) => {
                            this.setState({ rhFactor: e.target.value });
                          }}
                        >
                          <option value="Negative">Negative</option>
                          <option value="Positive">Positive</option>
                        </select>
                        <br />
                        <br />
                        <h4 class="p-value">
                          Receive Donation Request :&ensp;
                        </h4>
                        <select
                          class="p-value form-control up-modal-input"
                          name="donationRequest"
                          required
                          value={this.state.reqDonor}
                          onChange={(e) => {
                            this.setState({ reqDonor: e.target.value });
                          }}
                        >
                          <option value={false}>No</option>
                          <option value={true}>Yes</option>
                        </select>
                        <br />
                        <br />
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Discard Changes
                          </button>
                          <button class="btn btn-success" type="submit">
                            Next
                          </button>
                        </div>
                      </h4>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
