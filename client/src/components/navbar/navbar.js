import React, { Component } from "react";
import "./navbar.css";
import AuthNav from "./AuthNav/AuthNav";
import UnAuthNav from "./unAuthNav/unAuthNav";
import AuthContext from "../../context/auth-context";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  static contextType = AuthContext;
  render() {
    return (
      <div id="Top-Nav">
        {this.context.authenticated ? (
          <AuthNav></AuthNav>
        ) : (
          <UnAuthNav></UnAuthNav>
        )}
      </div>
    );
  }
}

export default Navbar;
