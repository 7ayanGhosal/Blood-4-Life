import React, { Component } from "react";
import "./passwordSetter.css";
import AuthContext from "../../../../context/auth-context";

class PasswordSetter extends Component {
  constructor(props) {
    super(props);
  }
  state = { p1: "", p2: "", message: "" };
  static contextType = AuthContext;
  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ message: "" });
    if (this.state.p1 !== this.state.p2)
      this.setState({ message: "Passwords do not match!" });
    else this.context.setPassword(this.state.p1);
  };
  reset = () => {
    this.setState({ p1: "", p2: "", message: "" });
    this.context.remove();
  };
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
              <button
                id="closePasswordBox"
                type="button"
                class="btn-close modal-close-button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div class="modal-body">
                <h5 class="modal-title" id="exampleModalLabel">
                  Set Password
                </h5>
                <div class="card w-100" style={{ width: 18 + "rem" }}>
                  <div
                    class="card-body" /*style={{ backgroundColor: bisque }}*/
                  >
                    <h5 class="card-title">Set Password</h5>
                    <p class="card-text pscard" style={{ fontStyle: "italic" }}>
                      <form onSubmit={this.onFormSubmit}>
                        <center>
                          <center>
                            <div>
                              <br></br>
                              <br></br>
                              <b>
                                {" "}
                                Password :
                                <input
                                  placeholder=" Enter the password "
                                  type="password"
                                  value={this.state.p1}
                                  onChange={(e) => {
                                    this.setState({
                                      p1: e.target.value,
                                      message: "",
                                    });
                                  }}
                                />
                                <br></br>
                                <br></br>
                                Re-type Password :
                                <input
                                  placeholder=" Re-type password "
                                  type="password"
                                  value={this.state.p2}
                                  onChange={(e) => {
                                    this.setState({
                                      p2: e.target.value,
                                      message: "",
                                    });
                                  }}
                                />
                              </b>
                              <div style={{ color: "red" }}>
                                {this.state.message}
                              </div>
                            </div>
                          </center>

                          <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">
                              Next
                            </button>
                          </div>
                        </center>
                      </form>
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
