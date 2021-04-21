import React, {Component} from 'react';
import './userProfile.css';
import AuthContext from '../../../../../context/auth-context';

class UserProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    age: 0,
    gender: 'Male',
    bloodGroup: 'A',
    rhFactor: 'Negative',
    recDonor: false,
  };
  static contextType = AuthContext;

  onFormSubmit = (event) => {
    event.preventDefault();

    this.context.setProfile(this.state);
  };
  reset = () => {
    this.setState({
      firstName: '',
      lastName: '',
      age: 0,
      gender: 'Male',
      bloodGroup: 'A',
      rhFactor: 'Negative',
      recDonor: false,
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
                <h5 class="modal-title" id="exampleModalLabel">
                  Profile Details
                </h5>
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
                  <div class="card w-100" style={{width: 18 + 'rem'}} />
                  <div class="card w-100">
                    <div class="card-body">
                      <h5 class="card-title">Profile</h5>
                      <p class="card-text">
                        First Name :
                        <input
                          placeholder=" Enter your first name "
                          type="text"
                          name="firstName"
                          required
                          value={this.state.firstName}
                          onChange={(e) => {
                            this.setState({firstName: e.target.value});
                          }}
                        />
                        <br /> <br />
                        Last Name :
                        <input
                          placeholder=" Enter your Last name "
                          type="text"
                          name="lastName"
                          required
                          value={this.state.lastName}
                          onChange={(e) => {
                            this.setState({lastName: e.target.value});
                          }}
                        />
                        <br /> <br />
                        Gender :
                        <select
                          name="gender"
                          required
                          value={this.state.gender}
                          onChange={(e) => {
                            this.setState({gender: e.target.value});
                          }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <br />
                        <br />
                        Age :
                        <input
                          placeholder=" Enter your age "
                          type="number"
                          name="age"
                          required
                          value={this.state.age}
                          onChange={(e) => {
                            this.setState({age: e.target.value});
                          }}
                        />
                        <br /> <br />
                        Blood Group:
                        <select
                          name="bloodGroup"
                          required
                          value={this.state.bloodGroup}
                          onChange={(e) => {
                            this.setState({bloodGroup: e.target.value});
                          }}
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="AB">AB</option>
                          <option value="O">O</option>
                        </select>
                        <br /> <br />
                        Rh factor :
                        <select
                          name="rhFactor"
                          required
                          value={this.state.rhFactor}
                          onChange={(e) => {
                            this.setState({rhFactor: e.target.value});
                          }}
                        >
                          <option value="Negative">Negative</option>
                          <option value="Positive">Positive</option>
                        </select>
                        <br />
                        <br />
                        Receive Donation Request:
                        <select
                          name="donationRequest"
                          required
                          value={this.state.recDonor}
                          onChange={(e) => {
                            this.setState({recDonor: e.target.value});
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
                          <button class="btn btn-primary" type="submit">
                            Create Account
                          </button>
                        </div>
                      </p>
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