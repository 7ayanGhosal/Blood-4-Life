import React, { Component } from "react";
import "./hospital.css";
import AuthContext from "../../context/auth-context";

class Hospital extends Component {
  static contextType = AuthContext;
  state = { ...this.context };
  onFormSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);
    this.context.resetProfile(this.state);
  };
  render() {
    return (
      <div>
        <div class="topnav">
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item1">
                    <a class="nav-link active" aria-current="page" href="#">
                      Blood Bank Counter
                    </a>
                  </li>
                  <li class="nav-item1">
                    <a class="nav-link" href="#">
                      Upcoming Blood Donation Camps
                    </a>
                  </li>
                  <li class="nav-item1">
                    <a class="nav-link" href="#">
                      Organise a Blood Donation Camp
                    </a>
                  </li>
                  <li class="nav-item1">
                    <a class="nav-link" href="#">
                      Profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div class="back">
          <div class="container">
            <center>
              <h1>Blood Group Counter</h1>
              <div class="row">
                <div class="col-sm">
                  <div class="col-name">
                    <p class="text1">
                      <b> Positive Rh :- </b>
                    </p>
                  </div>{" "}
                  <br></br>
                  <p class="text">
                    A+ :- <input type="number" name="OTP" min="1" max="99999" />
                  </p>
                  <br></br>
                  <p class="text">
                    B+ :- <input type="number" name="OTP" min="1" max="99999" />
                  </p>
                  <br></br>
                  <p class="text">
                    AB+ :-{" "}
                    <input type="number" name="OTP" min="1" max="99999" />
                  </p>
                  <br></br>
                  <p class="text">
                    O+ :- <input type="number" name="OTP" min="1" max="99999" />
                  </p>
                  <br></br>
                </div>
                <div class="col-sm">
                  <div class="col-name">
                    <p class="text1">
                      <b> Negetive Rh:- </b>
                    </p>
                  </div>{" "}
                  <br></br>
                  <p class="text">
                    A- :- <input type="number" name="OTP" min="1" max="99999" />
                  </p>
                  <br></br>
                  <p class="text">
                    B- :- <input type="number" name="OTP" min="1" max="99999" />
                  </p>
                  <br></br>
                  <p class="text">
                    AB- :-{" "}
                    <input type="number" name="OTP" min="1" max="99999" />
                  </p>
                  <br></br>
                  <p class="text">
                    O- :- <input type="number" name="OTP" min="1" max="99999" />
                  </p>
                  <br></br>
                </div>
              </div>
            </center>
          </div>
        </div>
        <div class="container">
          <center>
            <h1>Upcoming Blood Donation Camps</h1>
            <nav id="navbar-example2" class="navbar navbar-light bg-light px-3">
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link active" href="#camp1">
                    Camp 1
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#camp2">
                    Camp 2
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#camp3">
                    Camp 3
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#camp4">
                    Camp 4
                  </a>
                </li>
              </ul>
            </nav>
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-offset="0"
              tabindex="0"
            >
              <h4 id="camp1">Camp 1</h4>
              <p>...</p>
              <h4 id="camp2">Camp 2</h4>
              <p>...</p>
              <h4 id="camp3">Camp 3</h4>
              <p>...</p>
              <h4 id="camp4">Camp 4</h4>
              <p>...</p>
            </div>
          </center>
        </div>
        <div>
          <div class="card-body">
            <h5 class="card-title">Profile Details</h5>
            <br />
            <div class="card-text">
              <h3 class="attribute" href="#">
                Name :-{" "}
              </h3>
              <h3 class="value">
                {this.context.firstName + " " + this.context.lastName}
              </h3>
              <br />
              <h3 class="attribute" href="#">
                Gender :-{" "}
              </h3>
              &ensp;
              <h3 class="value">{this.context.gender}</h3>
              <br />
              <h3 class="attribute" href="#">
                Age :-{" "}
              </h3>
              &ensp;
              <h3 class="value">{this.context.age}</h3>
              <br />
              <h3 class="attribute" href="#">
                Email :-{" "}
              </h3>
              <h3 class="value">{this.context.email}</h3>
              <br />
              <h3 class="attribute" href="#">
                Address :-{" "}
              </h3>
              &ensp;
              <h3 class="value">{this.context.address}</h3>
              <br />
              <h3 class="attribute" href="#">
                Blood Group :-{" "}
              </h3>
              &ensp;
              <h3 class="value">{this.context.bloodGroup}</h3>
              <br />
              <h3 class="attribute" href="#">
                Rh Factor :-{" "}
              </h3>
              &ensp;
              <h3 class="value">{this.context.rhFactor}</h3>
              <br />
              <h3 class="attribute" href="#">
                Last Donated on :-{" "}
              </h3>
              &ensp;
              <h3 class="value">{this.context.lastDonated}</h3>
              <br />
              <h3 class="attribute" href="#">
                Receive Donation Request :{" "}
              </h3>
              &ensp;
              <h3 class="value">{this.context.reqDonor}</h3>
              <br />
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#profileResetterModal"
          >
            Edit Profile
          </button>
          <div
            class="modal fade"
            id="profileResetterModal"
            data-bs-backdrop="static"
            tabindex="-1"
            aria-labelledby="exampleModalLabe"
            aria-hidden="true"
          >
            <form
              class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-new2"
              onSubmit={this.onFormSubmit}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h2 class="modal-title" id="exampleModalLabel">
                    Edit Profile
                  </h2>
                  <button
                    id="closeProfileResetterModal"
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="card w-100" style={{ width: 18 + "rem" }}>
                    <img
                      src="https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
                      class="card-img-top"
                      alt="..."
                    />
                    <input class="img-change" type="file" />
                    <br /> <br />
                    <div class="card-body">
                      <h4 class="card-title">Profile</h4>
                      <div class="card-text">
                        <h3 class="attribute" href="#">
                          First Name :-{" "}
                        </h3>
                        <input
                          class="value"
                          type="text"
                          value={this.state.firstName}
                          onChange={(e) => {
                            this.setState({ firstName: e.target.value });
                          }}
                        />
                        <br /> <br />
                        <h3 class="attribute" href="#">
                          Last Name :-{" "}
                        </h3>
                        <input
                          class="value"
                          type="text"
                          value={this.state.lastName}
                          onChange={(e) => {
                            this.setState({ lastName: e.target.value });
                          }}
                        />
                        <br /> <br />
                        <h3 class="attribute" href="#">
                          Address :-{" "}
                        </h3>
                        <input
                          class="value"
                          type-="text"
                          value={this.state.address}
                          onChange={(e) => {
                            this.setState({ address: e.target.value });
                          }}
                        />
                        <br />
                        <br />
                        <h3 class="attribute" href="#">
                          Blood Group :-{" "}
                        </h3>
                        <select
                          class="value"
                          value={this.state.bloodGroup}
                          onChange={(e) => {
                            this.setState({ bloodGroup: e.target.value });
                          }}
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="AB">AB</option>
                          <option value="O">O</option>
                        </select>
                        <br />
                        <br />
                        <h3 class="attribute" href="#">
                          Rh factor :-{" "}
                        </h3>
                        <select
                          class="value"
                          value={this.state.rhFactor}
                          onChange={(e) => {
                            this.setState({ rhFactor: e.target.value });
                          }}
                        >
                          <option value="Positive">Positive</option>
                          <option value="Negative">Negative</option>
                        </select>
                        <br />
                        <br />
                        <h3 class="attribute" href="#">
                          Receive Donation Request :-{" "}
                        </h3>
                        <select
                          class="value"
                          value={this.state.reqDonor}
                          onChange={(e) => {
                            this.setState({ reqDonor: e.target.value });
                          }}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                  ></input>
                </div>
              </div>
            </form>
          </center>
        </div>
      </div>
    );
  }
}

export default Hospital;
