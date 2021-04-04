import React, { Component } from "react";
import "./profileSetter.css";

class ProfileSetter extends Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "",
    bloodGroup: "",
    rhFactor: "",
  };

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit}>
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
                  <h5 class="modal-title" id="exampleModalLabel">
                    Profile Details
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    {/* <div class="card w-100" style={{ width: "18rem" }}> */}
                    <div class="card w-100">
                      <div class="card-body">
                        <h5 class="card-title">Profile</h5>
                        <p class="card-text">
                          First Name :
                          <input
                            id="text2"
                            placeholder=" Enter your first name "
                            type="text"
                            name="firstName"
                            required
                          />
                          <br /> <br />
                          Last Name :
                          <input
                            id="text2"
                            placeholder=" Enter your Last name "
                            type="text"
                            name="lastName"
                            required
                          />
                          <br /> <br />
                          Blood Group:
                          <select name="bloodGroup" required>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                          </select>
                          <br /> <br />
                          Rh factor :
                          <select name="rhFactor" required>
                            <option value="positive">Positive</option>
                            <option value="negetive">Negetive</option>
                          </select>
                          <br />
                          <br />
                          Receive Donation Request:
                          <select name="donationRequest" required>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <br />
                          <br />
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Discard Changes
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileSetter;
