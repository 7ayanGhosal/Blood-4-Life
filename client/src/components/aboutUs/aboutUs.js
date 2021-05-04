import React, { Component } from "react";
import "./aboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <div class="container-fluid creatorRow">
          <br />
          <h1 class="noname">Our Motto</h1>
          <p class="moto">
            The target of our project is to accumulate donors and hospitals all
            around the globe so that it can help someone find a suitable donor
            in case of emergency. Donating blood may reduce the risk of heart
            disease for men and stimulate the generation of red blood cells. The
            amount of toxic chemicals (e.g. mercury, pesticides, fire
            retardants) circulating in the blood stream is reduced by the amount
            contained in given blood. The good news is you can give blood again
            and again to help save more lives! If you're a regular blood donor,
            you can give blood once in 12 weeks. Every 2 Seconds, someone in the
            country is in need of blood. Every year our nation requires about 4
            Crore units of blood. Out of which only a meager 5 Lakh units of
            blood are available.
          </p>

          <h1 class="noname">How It works</h1>
          <p class="work">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.There are many variations of passages of Lorem Ipsum
            available, but the majority have suffered alteration in some form,
            by injected humour, or randomised words which don't look even
            slightly believable. If you are going to use a passage of Lorem
            Ipsum, you need to be sure there isn't anything embarrassing hidden
            in the middle of text.
          </p>
          <hr></hr>

          <center>
            <div class="new-header">
              <b>The Team</b>
            </div>
            <br />
          </center>
          <div class="row">
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-8 m-auto mt-3">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <div class="col1 ag"></div>
                  </div>
                  <div class="flip-card-back">
                    <br />
                    <h4>Ayan Ghosal</h4>
                    <br />
                    <br />
                    <b>Developer</b>
                    <br />
                    <br />
                    <h5>Jadavpur University</h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-8 m-auto mt-3">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <div class="col1 as"></div>
                  </div>
                  <div class="flip-card-back">
                    <br />
                    <h4>Aditya Saha</h4>
                    <br />
                    <br />
                    <b>Developer</b>
                    <br />
                    <br />
                    <h5>Jadavpur University</h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-8 m-auto mt-3">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <div class="col1 ps"></div>
                  </div>
                  <div class="flip-card-back">
                    <br />
                    <h4>Pulkit Singhania</h4>
                    <br />
                    <br />
                    <b>Developer</b>
                    <br />
                    <br />
                    <h5>Jadavpur University</h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-8 m-auto mt-3">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <div class="col1 rk"></div>
                  </div>
                  <div class="flip-card-back">
                    <br />
                    <h4>Rishav Kundu</h4>
                    <br />
                    <br />
                    <b>Developer</b>
                    <br />
                    <br />
                    <h5>Jadavpur University</h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-8 m-auto mt-3">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <div class="col1 sp"></div>
                  </div>
                  <div class="flip-card-back">
                    <br />
                    <h4>Sourav Patra</h4>
                    <br />
                    <br />
                    <b>Developer</b>
                    <br />
                    <br />
                    <h5>Jadavpur University</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default AboutUs;
