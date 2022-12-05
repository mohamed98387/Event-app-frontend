import React, { Component } from "react";
import { Route, NavLink, Link } from "react-router-dom";
import SignUpForm from "./SingUpForm";
import SignInForm from "./SingInForm";
import logo from "../../images/logo2.png";

import "./login.css";

class SingUpIn extends Component {
  render() {
    return (
      <div className="sing">
        <div className="sing__Aside">
          <Link to="/">
            <img src={logo} alt="logo2" />
          </Link>
        </div>
        <div className="sing__Form">
          <div className="PageSwitcher">
            <Link
              style={{
                marginTop: -10,
              }}
              to="/"
              className="btn-flat waves-effect"
            >
              <i className="material-icons left">keyboard_backspace</i>
            </Link>
            <div
              style={{
                marginTop: -10,
              }}
            >
              <NavLink
                to="/sign-in"
                activeClassName="PageSwitcher__Item--Active"
                className="PageSwitcher__Item"
              >
                Se connecter
              </NavLink>
              <NavLink
                to="/sign-up"
                activeClassName="PageSwitcher__Item--Active"
                className="PageSwitcher__Item"
              >
                S'inscrire
              </NavLink>
            </div>
          </div>

          <Route path="/sign-in" component={SignInForm} />
          <Route path="/sign-up" component={SignUpForm} />
        </div>
      </div>
    );
  }
}

export default SingUpIn;
