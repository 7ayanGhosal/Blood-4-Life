import React from "react";
import AuthContext from "../../../context/auth-context";
import "./organiseCamp.css";

class OrganiseCamp extends React.Component {
  static contextType = AuthContext;
  render() {
    <div>
      <center>
        <h1>Organise A Blood Camp</h1>
        <br></br>
        <form>
          <div class="mb-3 row">
            <label for="staticName" class="col-sm-2 col-form-label">
              Name:-
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="staticName"
                placeholder="Enter your name"
              ></input>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              Email:-{" "}
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="staticEmail"
                placeholder="email@example.com"
              ></input>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="location" class="col-sm-2 col-form-label">
              Location:-{" "}
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="location"></input>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="description" class="col-sm-2 col-form-label">
              Description:-{" "}
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="description"></input>
            </div>
          </div>
        </form>
      </center>
    </div>;
  }
}
