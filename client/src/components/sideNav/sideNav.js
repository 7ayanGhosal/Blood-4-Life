import React, { Component } from "react";
import "./sideNav.css";

class SideNav extends Component {
  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <a
          href={"javascript:void(0)"}
          className="closebtn"
          onclick="closeNav()"
        >
          &times;
        </a>
        {/* <input type="file" value="img" className="profile_pic" /> */}
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
        <button className="Save_address">Add Saved Places</button>
      </div>
    );
  }
}

export default SideNav;
