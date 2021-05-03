import React, { Component } from "react";
import "./hospitalSearch.css";
import axios from "axios";

class HospitalSearch extends Component {
  render() {
    return (
      <div id="hospitalSearch" class="search-row container-fluid mb-3">
        <form>
          <h5>Get Hospital Details:</h5>
          <div class="input-group w-50 m-auto mb-3">
            <span class="input-group-text" id="basic-addon1">
              Email
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <button class="btn btn-info btn-sm mx-2 w-25">Get</button>
        </form>
      </div>
    );
  }
}

export default HospitalSearch;
