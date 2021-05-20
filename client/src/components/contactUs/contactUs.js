import React, { Component } from "react";
import "./contactUs.css";
import axios from "axios";

class ContactUs extends Component {
  onFormSubmit = (e) => {
    e.preventDefault();
    var body = {
      name: e.target[0].value,
      email: e.target[1].value,
      msg: e.target[2].value,
    };
    axios.post("/contactUs", body).then((res) => {
      if (res.data) {
        document.getElementById("m-res").innerText =
          "Message received!\nOur team will get back to you\n";
        document.getElementById("m-form").style.display = "none";
        document.getElementById("m-another").style.display = "block";
      } else {
        document.getElementById("m-res").innerText =
          "Sorry Couldn't Send Your Message!";
      }
    });
  };
  another = () => {
    document.getElementById("m-res").innerText = "";
    document.getElementById("m-form").style.display = "block";
    document.getElementById("m-another").style.display = "none";
    document.getElementById("m-ta").value = "";
  };

  render() {
    return (
      <div class="contact-us-row row mb-2 mt-2">
        <div class="col col-12 col-md-6 d-flex align-items-center justify-content-center side1">
          <div class="text-center location">
            <h1 class="header1">LOCATION</h1>
            <p class="text1">Jadavpur University,Saltlake Campus</p>
            <p>
              B-73-80, Plot No.8, Salt Lake Bypass, LB Block, Sector III,
              Bidhannagar, Kolkata, West Bengal 700098
            </p>
            <p>Or,</p>
            <p>
              Email us at - <b>assist.blood4life@gmail.com</b>
            </p>

            <div class="followuslinks p-5">
              <h3 class="header1">Follow us</h3>
              <div class="u-social-icons">
                <a
                  href="https://www.facebook.com/assist.blood4life"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    class="u-social-url fab fa-twitter fa-2x p-3"
                    src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"
                    alt="facebookIcon"
                  ></img>
                </a>
                &ensp;
                <a
                  target="_blank"
                  href="https://twitter.com/Blood4life12"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/social-media-circle/512/circle-twitter-512.png"
                    class="u-social-url fab fa-twitter fa-2x p-3"
                    alt="twitterIcon"
                  ></img>
                </a>
                &ensp;
                <a
                  target="_blank"
                  href="https://www.instagram.com/assist.blood4life"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png"
                    class="u-social-url fab fa-instagram fa-2x p-3"
                    alt="instagramIcon"
                  ></img>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-12 col-md-6 d-flex align-items-center justify-content-center side2">
          <form
            id="m-form"
            class="w-100 text-center"
            onSubmit={this.onFormSubmit}
          >
            <h1 class="header2">CONTACT FORM</h1>

            <input
              type="text"
              class="bx-shadow form-control w-75 m-auto mb-3"
              id="exampleFormControlInput1"
              placeholder="Enter your Name"
              required
            />
            <input
              type="email"
              class="bx-shadow form-control w-75 m-auto mb-3"
              id="exampleFormControlInput1"
              placeholder="Enter your email id"
              required
            />

            <textarea
              class="bx-shadow form-control w-75 m-auto mb-3"
              id="m-ta"
              rows="3"
              placeholder="Enter your message"
              required
            ></textarea>

            <button type="submit" class="bx-shadow btn cu-submit mb-3">
              Submit
            </button>
          </form>
          <h5 id="m-res"></h5>
          <br />
          <br />
          <button
            id="m-another"
            style={{ display: "none" }}
            class="btn btn-warning"
            onClick={this.another}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }
}

export default ContactUs;
