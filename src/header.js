import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Hyph } from "./Utils/Utils";
import TokenService from "./services/token-service";

class Header extends Component {
  state = { localStorageSet: false };
  handleLogoutClick = (e) => {
    e.preventDefault();
    TokenService.clearAuthToken();
    window.localStorage.removeItem("userId");
    this.props.history.push("/");
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <a onClick={(e) => this.handleLogoutClick(e)} to="/" href="#">
          Logout
        </a>
        <Link to={`/user/${Number(window.localStorage.userId)}`}>
          My Script
        </Link>
      </div>
    );
  }
  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/register">Register</Link>
        <Hyph />
        <Link to="/login">Log in</Link>
      </div>
    );
  }
  render() {
    return (
      <nav className="Header">
        <h1>
          <Link to="/">
            <h1>Bashful</h1>
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    );
  }
}
export default withRouter(Header);
