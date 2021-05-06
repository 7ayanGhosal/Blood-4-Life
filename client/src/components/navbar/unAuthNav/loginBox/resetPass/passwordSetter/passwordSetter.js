import React, { Component } from "react";
import "./passwordSetter.css";
import AuthContext from "../../../../../../context/auth-context";
class PasswordSetter extends Component {
  state = { p1: "", p2: "", message: "" };
  static contextType = AuthContext;
  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ message: "" });
    if (this.state.p1 !== this.state.p2)
      this.setState({ message: "Passwords do not match!" });
    else {
      var pass = this.state.p1;
      this.setState({ p1: "", p2: "" }, () => {
        this.context.checkResetPassword(pass);
      });
    }
  };
  reset = () => {
    this.setState({ p1: "", p2: "", message: "" });
    this.context.remove();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <center>
            <center>
              <div>
                <br />
                <br />
                <h5 class="reset-pass-text">
                  {" "}
                  Enter Password &emsp;:&emsp;
                  <input
                    id="ResetPassInp1"
                    class="ps-modal-input form-control"
                    placeholder=" Enter password "
                    type="password"
                    value={this.state.p1}
                    required
                    onChange={(e) => {
                      this.setState({
                        p1: e.target.value,
                        message: "",
                      });
                    }}
                  />
                  <br></br>
                  <br></br>
                  Confirm Password :&ensp;
                  <input
                    id="ResetPassInp2"
                    class="ps-modal-input form-control"
                    placeholder=" Confirm password "
                    type="password"
                    value={this.state.p2}
                    onChange={(e) => {
                      this.setState({
                        p2: e.target.value,
                        message: "",
                      });
                    }}
                  />
                </h5>
                <br />
                <div style={{ color: "red" }}>{this.state.message}</div>
              </div>
            </center>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">
                Next
              </button>
            </div>
          </center>
        </form>
      </div>
    );
  }
}

export default PasswordSetter;
