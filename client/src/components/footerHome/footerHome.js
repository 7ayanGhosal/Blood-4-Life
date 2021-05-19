import React, { Component } from "react";
import "./footerHome.css";

class FooterHome extends Component {
  render() {
    return (
      <div class="footer">
        <div class="back">
          <div class="container pt-3 pb-3">
            <div class="row frow">
              <div class="col-12 col-sm-6">
                <div class="col-name mb-3">
                  <h3>Offered By :- </h3>
                </div>
                Team Blood4Life
                <br></br>
                Jadavpur University , Saltlake Campus,
                <br></br>
                Kolkata-700098
              </div>
              <div class="col-12 col-sm-6">
                <div class="col-name mb-3">
                  <h3>App Details:- </h3>
                </div>
                {/* <br></br> */}
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
            {/* <div class="row">
              <div class="col-12">
                <div class="col-name">
                  <h3> Creators:- </h3>
                </div>{" "}
                
                <div class="d-inline">
                  <div class="d-inline-block m-auto p-1">
                    Aditya Saha :
                    <a href="https://github.com/nervouscoder27" target="_blank">
                      <b class="cghid">
                        <i class="fab fa-github"></i>
                      </b>
                    </a>
                  </div>
                  <div class="d-inline-block m-auto p-1">
                    Ayan Ghosal :
                    <a href="https://github.com/7ayanGhosal" target="_blank">
                      <b class="cghid">
                        <i class="fab fa-github"></i>{" "}
                      </b>
                    </a>
                  </div>
                </div>
                <div>
                  <div class="d-inline-block m-auto p-1">
                    Pulkit Singhania :
                    <a
                      href="https://github.com/pulkit-singhania"
                      target="_blank"
                    >
                      <b class="cghid">
                        <i class="fab fa-github"></i>{" "}
                      </b>
                    </a>
                  </div>
                  <div class="d-inline-block m-auto p-1">
                    Rishav Kundu :
                    <a href="https://github.com/rishavkundu62" target="_blank">
                      <b class="cghid">
                        <i class="fab fa-github"></i>{" "}
                      </b>
                    </a>
                  </div>
                </div>
                <div>
                  Sourav Patra :
                  <a href="https://github.com/souravpatra33" target="_blank">
                    {" "}
                    <b class="cghid">
                      <i class="fab fa-github"></i>{" "}
                    </b>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default FooterHome;
