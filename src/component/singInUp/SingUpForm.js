import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, clearErrors } from "../../actions/authActions";

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      lastName: "",
      email: "",
      userName: "",
      password: "",
      firstName: "",
      password2: "",
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.errors) {
      this.props.history.push("/sign-in");
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.errors.errorSign) {
      alert("registered with success");
    }
    if (nextProps.errors.errorSign) {
      this.setState({
        errors: nextProps.errors.errorSign,
      });
    }
    if (
      nextProps.errors.errorSign.firstName ||
      nextProps.errors.errorSign.lastName ||
      nextProps.errors.errorSign.password ||
      nextProps.errors.errorSign.password2 ||
      nextProps.errors.errorSign.email ||
      nextProps.errors.errorSign.userName
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
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      userName: this.state.userName,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="FormCenter">
        <form onSubmit={this.onSubmit} className="FormFields" noValidate>
          <div style={{ marginTop: 50 }} className="FormField1">
            {this.props.errors.errorSign.firstName && (
              <p
                style={{
                  marginTop: -30,
                  position: "absolute",
                  fontSize: 14,
                  color: "rgb(255, 223, 177)",
                }}
              >
                {errors.firstName}
              </p>
            )}
            <input
              style={{ width: "90%" }}
              onChange={this.onChange}
              value={this.state.firstName}
              id="firstName"
              className="FormField__Input1"
              type="text"
              placeholder="Prénom:"
            />
          </div>
          <div className="FormField1">
            {this.props.errors.errorSign.lastName && (
              <p
                style={{
                  marginTop: -10,
                  position: "absolute",
                  color: "rgb(255, 223, 177)",
                  fontSize: 14,
                }}
              >
                {errors.lastName}
              </p>
            )}
            <input
              style={{ marginTop: 39, width: "90%" }}
              onChange={this.onChange}
              value={this.state.lastName}
              id="lastName"
              className="FormField__Input1"
              type="text"
              placeholder="Nom:"
            />
          </div>
          <div className="FormField1">
            {this.props.errors.errorSign.email && (
              <p
                style={{
                  marginTop: -10,
                  position: "absolute",
                  color: "rgb(255, 223, 177)",
                  fontSize: 14,
                }}
              >
                {errors.email}
              </p>
            )}
            <input
              style={{ marginTop: 39, width: "90%" }}
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              className="FormField__Input1"
              type="email"
              placeholder="Email:"
            />
          </div>
          <div className="FormField1">
            {this.props.errors.errorSign.userName && (
              <p
                style={{
                  marginTop: -10,
                  fontSize: 14,
                  position: "absolute",
                  color: "rgb(255, 223, 177)",
                }}
              >
                {errors.userName}
              </p>
            )}
            <input
              style={{ marginTop: 39, width: "90%" }}
              onChange={this.onChange}
              value={this.state.userName}
              id="userName"
              className="FormField__Input1"
              type="text"
              placeholder="Username:"
            />
          </div>
          <div className="FormField1">
            {this.props.errors.errorSign.password && (
              <p
                style={{
                  marginTop: -10,
                  position: "absolute",
                  color: "rgb(255, 223, 177)",
                  fontSize: 14,
                }}
              >
                {errors.password}
              </p>
            )}
            <input
              style={{ marginTop: 39, width: "90%" }}
              onChange={this.onChange}
              value={this.state.password}
              id="password"
              type="password"
              className="FormField__Input1"
              placeholder="Mot de passe:"
            />
          </div>
          <div className="FormField1">
            {this.props.errors.errorSign.password2 && (
              <p
                style={{
                  marginTop: -10,
                  position: "absolute",
                  color: "rgb(255, 223, 177)",
                  fontSize: 14,
                }}
              >
                {errors.password2}
              </p>
            )}
            <input
              style={{ marginTop: 39, width: "90%" }}
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              placeholder="Confirmer Password:"
              className="FormField__Input1"
              type="password"
            />
          </div>

          <div className="FormField1">
            <button
              type="submit"
              style={{
                marginTop: 20,
              }}
              className="FormField__Button1 mr-20"
            >
              S'inscrire
            </button>
            <Link to="/sign-in" className="FormField__Link1">
              Je suis déjà membre
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
SignUpForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  withRouter(SignUpForm)
);
