import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import DetailVideoPage from "./component/gallerie/DetailVideoPage";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "antd/dist/antd.css";
import store from "./store";
import Profil from "./component/profile/Profile1";
import Index from "./component/Index/Index";
import PrivateRoute from "./component/singInUp/private-route/PrivateRoute";
import PrivateRoute1 from "./component/singInUp/private-route/PrivalteRoute1";
import MiddGallerie from "./component/gallerie/MiddGallerie";
import Blog from "./component/blog/Blog";
import Evenements from "./component/evenements/Evenements";
import Contact from "./component/contact/Contact";
import SingUpIn from "./component/singInUp/SingUpIn";
import Profile from "./component/profile/Profile";
import ModelProfile from "./component/profile/Model";
import ReactLoading from "react-loading";
import Details from "./component/details/details";
import UserProfile from "./component/createur/UserProfile";
import { getAllAdherent } from "./actions/authActions";
import { connect } from "react-redux";
import Admin from "./component/profile/Admin";
import AdminRoute from "./component/singInUp/private-route/AdminRoute";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./sign-in";
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    fetch(`/api/adherent`)
      .then((res) => res.json())
      .then((json) => this.setState({ loading: true }));
    getAllAdherent();
  }
  render() {
    return (
      <div>
        {!this.state.loading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading
              type="balls"
              height={120}
              width={120}
              color="#f82249"
            />
          </div>
        ) : (
          <Router>
            <div className="App">
              <Route exact path="/" component={Index} />
              <Route exact path="/sign-in" component={SingUpIn} />
              <Route path="/sign-up" component={SingUpIn} />
              <Route exact path="/gallerie" component={MiddGallerie} />

              <Route path="/blog" component={Blog} />
              <Route path="/" component={ModelProfile} />
              <PrivateRoute path="/Profile" component={Profile} />
              <AdminRoute path="/Admin" component={Admin} />
              <PrivateRoute1 path="/Profil" component={Profil} />
              <Route exact path="/evenemet" component={Evenements} />
              <Route exact path="/contact" component={Contact} />
              <Route
                exact
                path="/gallerie/DetailVideoPage/:id"
                component={DetailVideoPage}
              />
              <Route
                path="/evenemet/:id"
                render={(props) => <Details {...props} />}
              />
              <Route exact path={`/active/User/:id`} component={UserProfile} />
            </div>
          </Router>
        )}
      </div>
    );
  }
}
export default connect(null, { getAllAdherent })(App);
