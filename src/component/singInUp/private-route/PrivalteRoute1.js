import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
const PrivateRoute1 = ({ component: Component, auth, ...rest }) => {
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/adherent`)
      .then((res) => res.json())
      .then((json) => setLoading(true));
  }, []);

  return (
    <div>
      {!Loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="balls" height={100} width={100} color="#f82249" />
        </div>
      ) : (
        <Route
          {...rest}
          render={(props) => {
            return auth.isAuthenticated === true && auth.registred === false ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute1);
