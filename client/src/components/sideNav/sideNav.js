import React, { Component } from "react";
import "./sideNav.css";

class SideNav extends Component {
  render() {
    return (
      <div
        class="modal fade"
        id="profileModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input type="file" className="profile_pic" />
              <br />
              <br />
              Blood Group:
              <select>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
              <br />
              <br />
              Rh factor :
              <select>
                <option value="positive">Positive</option>
                <option value="negetive">Negetive</option>
              </select>
              <br />
              <br />
              Address :<input type="text" placeholder="Enter your address " />
              <br />
              <br />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNav;
