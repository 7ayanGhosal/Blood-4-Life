import React, { Component } from "react";
import "./footerHome.css";

class FooterHome extends Component {
  render() {
    return (
      <div class="footer">
        <div class="back">
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <div class="col-name">
                  <h3>Address:- </h3>
                </div>
                <br></br>
                Jadavpur University Saltlake Campus,
                <br></br>
                Kolkata-700098
              </div>
              <div class="col-sm">
                <div class="col-name">
                  <h3> Creators:- </h3>
                </div>{" "}
                <br></br>
                Aditya Saha : <b class="cghid">GitHubID :- </b>
                <a href="https://github.com/nervouscoder27" target="_blank">
                  github.com/nervouscoder27
                </a>
                <br></br>
                Ayan Ghosal : <b class="cghid">GitHubID :- </b>
                <a href="https://github.com/7ayanGhosal" target="_blank">
                  github.com/7ayanGhosal
                </a>
                <br></br>
                Pulkit Singhania : <b class="cghid">GitHubID :- </b>
                <a href="https://github.com/pulkit-singhania" target="_blank">
                  github.com/pulkit-singhania
                </a>
                <br></br>
                Rishav Kundu :<b class="cghid">GitHubID :- </b>
                <a href="https://github.com/rishavkundu62" target="_blank">
                  github.com/rishavkundu62
                </a>
                <br></br>
                Sourav Patra : <b class="cghid">GitHubID :- </b>
                <a href="https://github.com/souravpatra33" target="_blank">
                  {" "}
                  github.com/souravpatra33
                </a>
                <br></br>
              </div>
              <div class="col-sm">
                <div class="col-name">
                  <h3>App Details:- </h3>
                </div>
                <br></br>
                GitHub ID:-{" "}
                <a href="https://github.com/Blood4LYF" target="_blank">
                  https://github.com/Blood4LYF
                </a>
                <br></br>
                Email ID:-{" "}
                <a href="mailto: assist.blood4life@gmail.com" target="_blank">
                  assist.blood4life@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterHome;
