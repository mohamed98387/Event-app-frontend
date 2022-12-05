import React, { useState } from "react";
import "./SideDrawer.css";
import { animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { activeClass } from "../../actions/authActions";
import { setModel } from "../../actions/modelAction";
import Menu from "@material-ui/core/Menu";
import { logoutUser } from "../../actions/authActions";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuItem from "@material-ui/core/MenuItem";
const SideDrawer = (props) => {
  let DrawerClasses = "SideDrawer";
  if (props.side) {
    DrawerClasses = "SideDrawer open";
  }
  const [anchorEl, setanchorEl] = useState(null);
  const scrollToTp = () => {
    scroll.scrollTo(-10);
    props.activeClass({
      acceuil: true,
      apropos: false,
      evnet: false,
      organisature: false,
    });
  };
  const handleClick = (event) => {
    setanchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setanchorEl(null);
  };
  const scrollToApropos = () => {
    scroll.scrollTo(500);
    props.activeClass({
      acceuil: false,
      apropos: true,
      evnet: false,
      organisature: false,
    });
  };

  const scrollToEvents = () => {
    scroll.scrollTo(910);
    props.activeClass({
      acceuil: false,
      apropos: false,
      evnet: true,
      organisature: false,
    });
  };

  const scrollToOrganisateure = () => {
    scroll.scrollTo(1670);
    props.activeClass({
      acceuil: false,
      apropos: false,
      evnet: false,
      organisature: true,
    });
  };

  return (
    <nav className={DrawerClasses}>
      <ul>
        <li style={{ marginTop: 100 }}>
          <Link
            className={
              props.navActive && props.actvieState.acceuil
                ? "activeItem"
                : "undefined"
            }
            to="/"
            onClick={scrollToTp}
          >
            ACCUEIL
          </Link>
        </li>
        <li>
          <Link
            className={
              props.navActive && props.actvieState.apropos
                ? "activeItem"
                : "undefined"
            }
            to="/"
            onClick={scrollToApropos}
          >
            À PROPOS
          </Link>
        </li>
        <li>
          <Link
            className={
              props.navActive && props.actvieState.evnet
                ? "activeItem"
                : "undefined"
            }
            onClick={scrollToEvents}
            to="/"
          >
            ÉVÈNEMENTS PROCHE
          </Link>
        </li>
        <li>
          <Link
            className={
              props.navActive && props.actvieState.organisature
                ? "activeItem"
                : "undefined"
            }
            to="/"
            onClick={scrollToOrganisateure}
          >
            ORGANISATEUR
          </Link>
        </li>

        <li>
          <Link
            className={props.navBg ? "activeItem" : "undefined"}
            to="/gallerie"
          >
            GALLERIE
          </Link>
        </li>

        <li>
          <Link
            className={props.navEvent ? "activeItem" : "undefined"}
            to="/evenemet"
          >
            ÉVÈNEMENT
          </Link>
        </li>
        <li>
          <Link
            className={props.navContact ? "activeItem" : "undefined"}
            to="/contact"
          >
            CONTACT
          </Link>
        </li>
        <li>
          <Link
            className={props.navBlog ? "activeItem" : "undefined"}
            to="/blog"
          >
            BLOG
          </Link>
        </li>
        {props.isAuth.isAuthenticated === true ? (
          props.admin === "chaieb.jasser@esprit.tn" ? (
            <div style={{ marginLeft: 30 }}>
              <Avatar
                onClick={handleClick}
                size={"large"}
                src={`http://localhost:5000/${props.isAuth.adherent.userImage}`}
                style={{
                  color: "red",
                  cursor: "pointer",
                  position: "absolute",
                  marginTop: -5,
                }}
                icon={<UserOutlined />}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="menu"
                style={{
                  position: "absolute",

                  marginTop: 55,
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{
                      listStyle: "none",
                      color: "black",
                    }}
                    to={`/Admin`}
                  >
                    Admin dashbord
                  </Link>
                </MenuItem>

                <MenuItem onClick={() => props.logoutUser()}>
                  Se déconnecter
                </MenuItem>
              </Menu>
            </div>
          ) : props.isAuth.registred === true ? (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Avatar
                onClick={handleClick}
                size={"large"}
                src={`http://localhost:5000/${props.isAuth.adherent.userImage}`}
                style={{
                  color: "red",
                  cursor: "pointer",
                  position: "absolute",
                  marginTop: 10,
                  marginLeft: 10,
                }}
                icon={<UserOutlined />}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="menu"
                style={{
                  position: "absolute",

                  marginTop: 55,
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{
                      listStyle: "none",
                      color: "black",
                    }}
                    to={`/Profile/user/${props.isAuth.user.id}`}
                  >
                    Profile
                  </Link>
                </MenuItem>

                <MenuItem onClick={() => props.logoutUser()}>
                  Se déconnecter
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <li className="connexionBt" onClick={() => props.setModel()}>
                <Link
                  to="/"
                  style={{
                    fontSize: "12px",
                    padding: "5px 3px",
                  }}
                >
                  Ajouter des évènements
                </Link>
              </li>
              <div style={{ display: "flex" }}>
                <SettingsIcon
                  onClick={handleClick}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "25px",
                    marginTop: 10,
                    position: "fixed",
                    marginLeft: "70px",
                  }}
                />
                <Menu
                  style={{ marginTop: 55 }}
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className="menu"
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      style={{
                        listStyle: "none",
                        color: "black",
                      }}
                      to={`/Profil/favorites/${props.isAuth.user.id}`}
                    >
                      Profile
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={() => props.logoutUser()}>
                    Se déconnecter
                  </MenuItem>
                </Menu>
              </div>
            </div>
          )
        ) : (
          <li className="connexionBt">
            <Link to="/sign-in">CONNEXION</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth,
    actvieState: state.classReducer,
    side: state.modelReducer.side,
    admin: state.auth.user.email,
  };
};
export default connect(mapStateToProps, { activeClass, logoutUser, setModel })(
  SideDrawer
);
