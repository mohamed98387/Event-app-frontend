import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import { makeStyles } from "@material-ui/core/styles";
import Bkt from "../Back-to-top/BackTop";
import ListIcon from "@material-ui/icons/List";
import GroupIcon from "@material-ui/icons/Group";
import Navbar from "./components@material/Navbars/Navbar.js";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Sidebar from "./components@material/Sidebar/Sidebar.js";
import Tablist from "./views/TableList/Tabliste";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import styles from "./assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "./assets/img/sidebar-2.jpg";
import logo from "./assets/img/reactlogo.png";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Dashboard from "@material-ui/icons/Dashboard";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import DashboardPage from "./views/Dashboard/Dashboard.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import Fav from "./views/Fav/Fav";
import ReactLoading from "react-loading";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import ContactPage from "./views/contact/ContactPage";
import Reservation from "./views/reservation/Reservation.js";
import NotificationsPage from "./views/Notifications/notification";
import VideoList from "./views/VideoList/VideoList";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import abonneVideos from "./views/abonnéVideos/AbonnéVideos";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import Adh from "./views/Adherents/Adherents";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import Events from "./views/Events/Events";
import SwitchVideoIcon from "@material-ui/icons/SwitchVideo";
import AllVideos from "./views/allVideos/AllVideos";
import Blog from "./views/blog/Blog";
import upload from "./views/Videos/upload";
import DashboardAdmin from "./views/dashboardAdmin/Dashboard";
//redux
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// let ps;
import axios from "axios";
import Users from "./views/users/Users";

const useStyles = makeStyles(styles);
const Profile = ({ ...rest }) => {
  const [Numbers, setNumbers] = useState(0);
  const notification = () => {
    axios.post("/api/notification/getNotification").then((res) => {
      if (res.data.success) {
        setNumbers(res.data.nbr);
      }
    });
  };
  notification();
  useEffect(() => {
    notification();
  });

  let id = rest.auth.user.id;
  let dashboard = "/dashboard/" + id.toString();
  let pathProfile = "/user/" + id.toString();
  let pathEvents = "/events/" + id.toString();
  let pathTab = "/table/" + id.toString();
  let pathNot = "/notifications/" + id.toString();
  let pathFav = "/favorites/" + id.toString();
  let pathRes = "/reservation/" + id.toString();
  let pathVideo = "/Video/" + id.toString();
  let pathVideoList = "/VideoList/" + id.toString();
  let pathAbonneList = "/abonneVideoList/" + id.toString();
  let allUsers = "/users/" + id.toString();
  let createures = "/createure/" + id.toString();
  let eventAdh = "/event/" + id.toString();
  let videoList = "/videos/" + id.toString();
  let blog = "/blog/" + id.toString();
  let contact = "/contact/" + id.toString();
  const dashboardRoutes = [
    {
      path: dashboard,
      name: " Dashboard",
      rtlName: "ملف تعريفي للمستخدم",
      icon: DashboardOutlinedIcon,
      component: DashboardAdmin,
      layout: "/Admin",
    },
    {
      path: pathProfile,
      name: " Profile",
      rtlName: "ملف تعريفي للمستخدم",
      icon: Person,
      component: UserProfile,
      layout: "/Admin",
    },
    {
      path: pathEvents,
      name: "Mes événements",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/Admin",
    },

    {
      path: pathTab,
      name: "Ajouter un événement",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: Tablist,
      layout: "/Admin",
    },
    {
      path: pathVideo,
      name: "Ajouter des vidéos",
      rtlName: "قائمة الجدول",
      icon: VideoCallIcon,
      component: upload,
      layout: "/Admin",
    },
    {
      path: pathVideoList,
      name: "Ma Liste des vidéos",
      rtlName: "قائمة الجدول",
      icon: PlaylistPlayIcon,
      component: VideoList,
      layout: "/Admin",
    },
    {
      path: pathAbonneList,
      name: "Abonnements",
      rtlName: "قائمة الجدول",
      icon: SubscriptionsIcon,
      component: abonneVideos,
      layout: "/Admin",
    },
    {
      path: pathFav,
      name: "Listes des favoris",
      rtlName: "قائمة الجدول",
      icon: FavoriteBorderIcon,
      component: Fav,
      layout: "/Admin",
    },

    {
      path: pathRes,
      name: "Listes des réservations",
      rtlName: "قائمة الجدول",
      icon: BookmarkIcon,
      component: Reservation,
      layout: "/Admin",
    },
    {
      path: allUsers,
      name: "Listes des utilisateurs",
      rtlName: "إخطارات",
      icon: GroupIcon,
      component: Users,
      layout: "/Admin",
    },
    {
      path: createures,
      name: "Listes des créateures",
      rtlName: "قائمة الجدول",
      icon: SupervisedUserCircleIcon,
      component: Adh,
      layout: "/Admin",
    },
    {
      path: eventAdh,
      name: "Listes des événements",
      rtlName: "قائمة الجدول",
      icon: ListIcon,
      component: Events,
      layout: "/Admin",
    },
    {
      path: videoList,
      name: "Listes des vidéos",
      rtlName: "قائمة الجدول",
      icon: SwitchVideoIcon,
      component: AllVideos,
      layout: "/Admin",
    },
    {
      path: blog,
      name: `Gérer le blog`,
      rtlName: "إخطارات",
      icon: SettingsApplicationsIcon,
      component: Blog,
      layout: "/Admin",
    },
    {
      path: contact,
      name: `mes contacts`,
      rtlName: "إخطارات",
      icon: PermContactCalendarIcon,
      component: ContactPage,
      layout: "/Admin",
    },
    {
      path: pathNot,
      name: `Notifications (${Numbers})`,
      rtlName: "إخطارات",
      icon: Notifications,
      component: NotificationsPage,
      layout: "/Admin",
    },
  ];

  const switchRoutes = (
    <Switch>
      {dashboardRoutes.map((prop, key) => {
        if (prop.layout === "/Admin") {
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
      <Redirect from="/Admin" to={`/Admin/dashboard/${id}`} />
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
