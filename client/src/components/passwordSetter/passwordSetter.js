import React, { Component } from "react";
import "./passwordSetter.css";

class PasswordSetter extends Component {
  render() {
    return (
      <div>
        <button
          id="passwordSetterModalButton"
          type="button"
          class="btn navbar-custom text-align-center pe-4 ps-4 icons2 d-none"
          data-bs-toggle="modal"
          data-bs-target="#passwordSetterModal"
        >
          Login
        </button>
        <div
          class="modal fade"
          id="passwordSetterModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Set Password
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="card w-100" style={{ width: 18 + "rem" }}>
                  <div
                    class="card-body" /*style={{ backgroundColor: bisque }}*/
                  >
                    <h5 class="card-title">login page</h5>
                    <p class="card-text" /*style={{ fontStyle: italic }}*/>
                      <center>
                        <center>
                          <div>
                            <br></br>
                            <br></br>
                            <b>
                              {" "}
                              Password :
                              <input
                                id="text2"
                                placeholder=" Enter the password "
                                type="password"
                              />
                              <br></br>
                              <br></br>
                              Reenter Password :
                              <input
                                id="text2"
                                placeholder=" Renter the password "
                                type="password"
                              />
                            </b>
                          </div>
                        </center>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary">
                            Next
                          </button>
                        </div>
                      </center>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordSetter;
