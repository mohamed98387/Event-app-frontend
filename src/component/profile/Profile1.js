import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Bkt from "../Back-to-top/BackTop";
// core components
import Navbar from "./components@material/Navbars/Navbar.js";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Sidebar from "./components@material/Sidebar/Sidebar.js";

import styles from "./assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "./assets/img/sidebar-2.jpg";
import logo from "./assets/img/reactlogo.png";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Fav from "./views/Fav/Fav";
import ReactLoading from "react-loading";
import Reservation from "./views/reservation/Reservation.js";
import abonneVideos from "./views/abonnéVideos/AbonnéVideos";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
//redux
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// let ps;

const useStyles = makeStyles(styles);
const Profil = ({ ...rest }) => {
  // styles

  let id = rest.auth.user.id;
  let pathFav = "/favorites/" + id.toString();
  let pathRes = "/reservation/" + id.toString();
  let pathAbonneList = "/abonneVideoList/" + id.toString();
  const dashboardRoutes = [
    {
      path: pathFav,
      name: "Listes des favoris",
      rtlName: "قائمة الجدول",
      icon: FavoriteBorderIcon,
      component: Fav,
      layout: "/Profil",
    },
    {
      path: pathRes,
      name: "Listes des réservations",
      rtlName: "قائمة الجدول",
      icon: BookmarkIcon,
      component: Reservation,
      layout: "/Profil",
    },
    {
      path: pathAbonneList,
      name: "Abonnements",
      rtlName: "قائمة الجدول",
      icon: SubscriptionsIcon,
      component: abonneVideos,
      layout: "/Profil",
    },
  ];

  const switchRoutes = (
    <Switch>
      {dashboardRoutes.map((prop, key) => {
        if (prop.layout === "/Profil") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/Profil" to={`/Profil/user/${id}`} />
    </Switch>
  );

  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };

  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/adherent`)
      .then((res) => res.json())
      .then((json) => setLoading(true));
  }, []);

  return (
    <div>
      {Loading ? (
        <div className={classes.wrapper}>
          <Sidebar
            routes={dashboardRoutes}
            logo={logo}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            {...rest}
          />

          <div className={classes.mainPanel} ref={mainPanel}>
            <Navbar
              routes={dashboardRoutes}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
          </div>
          <Bkt />
        </div>
      ) : (
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
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Profil);
