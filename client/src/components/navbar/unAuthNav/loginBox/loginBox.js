import React, { Component } from "react";
import "./loginBox.css";
import ResetPass from "./resetPass/resetPass";
import AuthContext from "../../../../context/auth-context";

class LoginBox extends Component {
  state = { email: "", pass: "" };
  static contextType = AuthContext;
  onFormSubmit = (event) => {
    event.preventDefault();
    this.context.checkLogin(this.state);
  };
  render() {
    return (
      <div>
        <div
          class="modal fade"
          id="loginModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
              <button
                id="closeLoginModal"
                type="button"
                class="btn-close modal-close-button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div class="modal-body">
                <h5 class="modal-title" id="exampleModalLabel">
                  Login Page
                </h5>
                <div class="card w-100" style={{ width: 18 + "rem" }}>
                  <div class="card-body" style={{ backgroundColor: "bisque" }}>
                    <h5 class="card-title">Enter your credentials</h5>
                    <p class="card-text">
                      <center>
                        <form onSubmit={this.onFormSubmit}>
                          <div>
                            <br></br>
                            <br></br>
                            <b>
                              Email ID :
                              <input
                                id="text2"
                                placeholder=" Enter your email ID "
                                type="email"
                                value={this.state.email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                              />
                              <br></br>
                              <br></br>
                              Password :
                              <input
                                id="text2"
                                placeholder=" Enter your password "
                                type="password"
                                value={this.state.pass}
                                onChange={(e) =>
                                  this.setState({ pass: e.target.value })
                                }
                              />
                            </b>
                          </div>
                          <h5 id="loginMessage"></h5>

                          <div class="modal-footer">
                            <button
                              id="ResetPassButton"
                              type="submit"
                              class="btn btn-danger"
                              onClick={this.context.resetPass}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              data-bs-toggle="modal"
                              data-bs-target="#resetPassModal"
                            >
                              Reset Password
                            </button>
                            <button type="submit" class="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </form>
                      </center>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ResetPass></ResetPass>
      </div>
    );
  }
}

export default LoginBox;
