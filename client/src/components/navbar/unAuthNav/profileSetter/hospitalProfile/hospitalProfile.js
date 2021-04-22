import React, {Component} from 'react';
import './hospitalProfile.css';
import AuthContext from '../../../../../context/auth-context';

class HospitalProfile extends Component {
  state = {
    name: '',
    zip: 0,
    city: '',
    address: '',
  };
  static contextType = AuthContext;

  onFormSubmit = (event) => {
    event.preventDefault();

    this.context.setProfile(this.state);
  };
  reset = () => {
    this.setState({
      name: '',
      zip: 0,
      city: '',
      address: '',
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
                  onClick={this.reset}
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={this.onFormSubmit}>
                  <div class="card w-100" style={{width: 18 + 'rem'}} />
                  <div class="card w-100">
                    <div class="card-body">
                      <h5 class="card-title">Profile</h5>
                      <p class="card-text">
                        Name :
                        <input
                          placeholder=" Enter the hospital's name "
                          type="text"
                          name="Name"
                          required
                          value={this.state.name}
                          onChange={(e) => {
                            this.setState({name: e.target.value});
                          }}
                        />
                        <br /> <br />
                        <input
                          placeholder=" Enter the address "
                          type="text"
                          name="Address"
                          required
                          value={this.state.address}
                          onChange={(e) => {
                            this.setState({address: e.target.value});
                          }}
                        />
                        <br /> <br />
                        <input
                          placeholder=" Enter the city name "
                          type="text"
                          name="City"
                          required
                          value={this.state.city}
                          onChange={(e) => {
                            this.setState({city: e.target.value});
                          }}
                        />
                        <br /> <br />
                        <input
                          placeholder=" Enter the pincode "
                          type="text"
                          name="Zipcode"
                          required
                          value={this.state.zip}
                          onChange={(e) => {
                            this.setState({zip: e.target.value});
                          }}
                        />
                        <br /> <br />
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

export default HospitalProfile;
