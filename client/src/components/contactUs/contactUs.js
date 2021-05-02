import React, { Component } from "react";
import "./contactUs.css";

class ContactUs extends Component {
  render() {
    return (
      // <div class="">
      <div class="contact-us-row row mb-3">
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
                >
                  <img
                    class="u-social-url fab fa-twitter fa-2x p-3"
                    src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"
                  ></img>
                </a>
                &ensp;
                <a target="_blank" href="https://twitter.com/Blood4life12">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/social-media-circle/512/circle-twitter-512.png"
                    class="u-social-url fab fa-twitter fa-2x p-3"
                  ></img>
                </a>
                &ensp;
                <a
                  target="_blank"
                  href="https://www.instagram.com/assist.blood4life"
                >
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png"
                    class="u-social-url fab fa-instagram fa-2x p-3"
                  ></img>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-12 col-md-6 d-flex align-items-center justify-content-center side2">
          <div class="w-100 text-center">
            <h1 class="header2">CONTACT FORM</h1>

            <input
              type="text"
              class="form-control w-75 m-auto mb-3"
              id="exampleFormControlInput1"
              placeholder="Enter your Name"
            />
            <input
              type="email"
              class="form-control w-75 m-auto mb-3"
              id="exampleFormControlInput1"
              placeholder="Enter your email id"
            />

            <textarea
              class="form-control w-75 m-auto mb-3"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Enter your message"
            ></textarea>

            <button type="button" class="w-50 btn btn-info text-dark mb-3">
              Submit
            </button>
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export default ContactUs;
