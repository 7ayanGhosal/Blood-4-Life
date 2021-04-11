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
    else this.context.checkResetPassword(this.state.p1);
  };

  render() {
    return (
      <div>
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
                    id="ResetPassInp1"
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
                    id="ResetPassInp2"
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
                <div style={{ color: "red" }}>{this.state.message}</div>
              </div>
            </center>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">
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
