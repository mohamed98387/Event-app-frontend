import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Bkt from "../Back-to-top/BackTop";
// core components
import Message from "./views/Message/Message";
import EmailIcon from "@material-ui/icons/Email";
import Navbar from "./components@material/Navbars/Navbar.js";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Sidebar from "./components@material/Sidebar/Sidebar.js";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import styles from "./assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "./assets/img/sidebar-2.jpg";
import logo from "./assets/img/reactlogo.png";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import TableList from "./views/TableList/TableList";
import DashboardPage from "./views/Dashboard/Dashboard.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import Fav from "./views/Fav/Fav";
import ReactLoading from "react-loading";
import Videos from "./views/Videos/Videos";
import Reservation from "./views/reservation/Reservation.js";
import NotificationsPage from "./views/Notifications/Notifications.js";
import VideoList from "./views/VideoList/VideoList";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import abonneVideos from "./views/abonnéVideos/AbonnéVideos";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
//redux
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// let ps;
import axios from "axios";

const useStyles = makeStyles(styles);
const Profile = ({ ...rest }) => {
  // styles
  const [Numbers, setNumbers] = useState(0);
  const [message, setMessage] = useState(0);
  const getMessage = () => {
    axios.post("/api/message/getMessage").then((res) => {
      if (res.data.success) {
        setMessage(res.data.nbr);
      }
    });
  };
  const notification = () => {
    axios.post("/api/notification/getnotifications").then((res) => {
      if (res.data.success) {
        setNumbers(res.data.nbr);
      }
    });
  };

  useEffect(() => {
    getMessage();
    notification();
  });
  let id = rest.auth.user.id;
  let pathProfile = "/user/" + id.toString();
  let pathEvents = "/events/" + id.toString();
  let pathTab = "/table/" + id.toString();
  let pathNot = "/notifications/" + id.toString();
  let pathFav = "/favorites/" + id.toString();
  let pathRes = "/reservation/" + id.toString();
  let pathVideo = "/Video/" + id.toString();
  let pathVideoList = "/VideoList/" + id.toString();
  let pathAbonneList = "/abonneVideoList/" + id.toString();
  let pathMessage = "/message/" + id.toString();
  const dashboardRoutes = [
    {
      path: pathProfile,
      name: " Profile",
      rtlName: "ملف تعريفي للمستخدم",
      icon: Person,
      component: UserProfile,
      layout: "/Profile",
    },
    {
      path: pathEvents,
      name: "Mes événements",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/Profile",
    },

    {
      path: pathTab,
      name: "Ajouter des événements",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: TableList,
      layout: "/Profile",
    },
    {
      path: pathVideo,
      name: "Ajouter des vidéos",
      rtlName: "قائمة الجدول",
      icon: VideoCallIcon,
      component: Videos,
      layout: "/Profile",
    },
    {
      path: pathVideoList,
      name: "Ma Liste des vidéos",
      rtlName: "قائمة الجدول",
      icon: PlaylistPlayIcon,
      component: VideoList,
      layout: "/Profile",
    },
    {
      path: pathAbonneList,
      name: "Abonnements",
      rtlName: "قائمة الجدول",
      icon: SubscriptionsIcon,
      component: abonneVideos,
      layout: "/Profile",
    },
    {
      path: pathFav,
      name: "Listes des favoris",
      rtlName: "قائمة الجدول",
      icon: FavoriteBorderIcon,
      component: Fav,
      layout: "/Profile",
    },

    {
      path: pathRes,
      name: "Listes des réservations",
      rtlName: "قائمة الجدول",
      icon: BookmarkIcon,
      component: Reservation,
      layout: "/Profile",
    },
    {
      path: pathMessage,
      name: `Messages (${message})`,
      rtlName: "إخطارات",
      icon: EmailIcon,
      component: Message,
      layout: "/Profile",
    },
    {
      path: pathNot,
      name: `Notifications (${Numbers})`,
      rtlName: "إخطارات",
      icon: Notifications,
      component: NotificationsPage,
      layout: "/Profile",
    },
  ];

  const switchRoutes = (
    <Switch>
      {dashboardRoutes.map((prop, key) => {
        if (prop.layout === "/Profile") {
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
      <Redirect from="/Profile" to={`/Profile/user/${id}`} />
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
export default connect(mapStateToProps, { logoutUser })(Profile);
