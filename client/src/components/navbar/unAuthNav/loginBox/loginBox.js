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
  reset = () => {
    this.setState({ email: "", pass: "" });
    this.context.remove();
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
                onClick={this.reset}
              ></button>
              <div class="modal-body">
                <h2 class="modal-title loginh" id="exampleModalLabel">
                  Login Page
                </h2>
                <div class="card w-100 lbox-bg" style={{ width: 18 + "rem" }}>
                  <div class="card-body">
                    <h4 class="card-title">Enter your credentials</h4>
                    <br />
                    <p class="card-text">
                      <center>
                        <form onSubmit={this.onFormSubmit}>
                          <div class="form-group row">
                            <br></br>
                            <br></br>
                            <h5 class="field-label">
                              Email ID &nbsp;:&ensp;
                              <input
                                class="modal-input form-control"
                                autoFocus
                                placeholder=" Enter your Email ID "
                                type="email"
                                value={this.state.email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                              />
                              <br></br>
                              <br></br>
                              <br></br>
                              Password :&ensp;
                              <input
                                class="modal-input form-control"
                                placeholder=" Enter your password "
                                type="password"
                                value={this.state.pass}
                                onChange={(e) =>
                                  this.setState({ pass: e.target.value })
                                }
                              />
                            </h5>
                            <br />
                          </div>
                          <h5 id="loginMessage"></h5>

                          <div class="modal-footer">
                            <button
                              type="submit"
                              class="btn btn-primary login-dummy"
                            ></button>
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
