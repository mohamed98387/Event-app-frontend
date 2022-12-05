import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import { clearErrors } from "../../actions/authActions";
import Bkt from "../Back-to-top/BackTop";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }
    if (nextProps.errors.errorSign) {
      this.setState({
        errors: nextProps.errors.errorSign,
      });
    }
    if (
      nextProps.errors.errorSign.passwordincorrect ||
      nextProps.errors.errorSign.password ||
      nextProps.errors.errorSign.emailnotfound ||
      nextProps.errors.errorSign.email
    ) {
      setTimeout(() => {
        this.props.clearErrors();
      }, 3000);
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="FormCenter">
        <form onSubmit={this.onSubmit} className="FormFields">
          <div className="FormField">
            {(this.props.errors.errorSign.emailnotfound ||
              this.props.errors.errorSign.email) && (
              <Alert
                color="warning"
                style={{ marginTop: 10, position: "absolute", width: "37%" }}
              >
                {errors.email}
                {errors.emailnotfound}
              </Alert>
            )}
            <input
              style={{
                marginTop: 100,
              }}
              type="email"
              id="email"
              className="FormField__Input"
              placeholder="Tapez votre email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
          </div>

          <div className="FormField">
            {(this.props.errors.errorSign.passwordincorrect ||
              this.props.errors.errorSign.password) && (
              <Alert
                color="warning"
                style={{ marginTop: 10, position: "absolute", width: "37%" }}
              >
                {errors.password}
                {errors.passwordincorrect}
              </Alert>
            )}
            <input
              style={{
                marginTop: 100,
              }}
              type="password"
              id="password"
              className="FormField__Input"
              placeholder="Tapez votre mot de passe"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
            />
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20">Se connecter</button>
            <Link to="/sign-up" className="FormField__Link">
              Créer un compte
            </Link>
          </div>
        </form>
        <Bkt />
      </div>
    );
  }
}

SignInForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser, clearErrors })(SignInForm);
