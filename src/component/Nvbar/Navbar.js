import React, { Component } from "react";
import logo from "../../images/logo2.png";
import "./navbar.css";
import DrawerButton from "../SideDrawer/DrawerButton";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { connect } from "react-redux";
import { activeClass } from "../../actions/authActions";
import { setModel, removeModel } from "../../actions/modelAction";
import { getAdhrent, logoutUser } from "../../actions/authActions";
import ReactLoading from "react-loading";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Menu from "@material-ui/core/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuItem from "@material-ui/core/MenuItem";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      scrolled: false,
      loading: false,
      anchorEl: null,
    };
    this.scrollToTp = this.scrollToTp.bind(this);
    this.scrollToApropos = this.scrollToApropos.bind(this);
    this.scrollToEvents = this.scrollToEvents.bind(this);
    this.scrollToOrganisateure = this.scrollToOrganisateure.bind(this);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 150;
      if (isTop !== true) {
        this.setState({ scrolled: true });
      } else {
        this.setState({ scrolled: false });
      }
    });
    fetch(`/api/adherent`)
      .then((res) => res.json())
      .then((json) => this.setState({ loading: true }));
  }
  componentWillUnmount() {
    this.setState({ scrolled: false });
    this.setState({ scrolled: true });
  }
  scrollToTp() {
    scroll.scrollTo(-10);
    this.props.activeClass({
      acceuil: true,
      apropos: false,
      evnet: false,
      organisature: false,
    });
  }
  scrollToApropos() {
    scroll.scrollTo(500);

    this.props.activeClass({
      acceuil: false,
      apropos: true,
      evnet: false,
      organisature: false,
    });
  }

  scrollToEvents() {
    scroll.scrollTo(910);

    this.props.activeClass({
      acceuil: false,
      apropos: false,
      evnet: true,
      organisature: false,
    });
  }

  scrollToOrganisateure() {
    scroll.scrollTo(1670);

    this.props.activeClass({
      acceuil: false,
      apropos: false,
      evnet: false,
      organisature: true,
    });
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
              height={100}
              width={100}
              color="#f82249"
            />
          </div>
        ) : (
          <header
            className={
              this.state.scrolled ||
              this.props.navBg ||
              this.props.navEvent ||
              this.props.navBlog ||
              this.props.navContact ||
              this.props.navDetailVideo ||
              this.props.navPr
                ? "navbar scrolled"
                : "navbar "
            }
            style={{ position: "fixed" }}
          >
            <nav className="navbar-navigation">
              <div className="navbar-logo">
                <Link to="/">
                  <img src={logo} onClick={this.scrollToTp} alt="logo" />
                </Link>
              </div>

              <div className="navbar-items">
                <ul className="nav-menu">
                  <li
                    className={
                      this.props.navActive && this.props.actvieState.acceuil
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link to="/" onClick={this.scrollToTp}>
                      ACCUEIL
                    </Link>
                  </li>
                  <li
                    className={
                      this.props.navActive && this.props.actvieState.apropos
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link to="/" onClick={this.scrollToApropos}>
                      À PROPOS
                    </Link>
                  </li>
                  <li
                    className={
                      this.props.navActive && this.props.actvieState.evnet
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link onClick={this.scrollToEvents} to="/">
                      ÉVÈNEMENTS PROCHE
                    </Link>
                  </li>
                  <li
                    className={
                      this.props.navActive &&
                      (this.props.actvieState.organisature || this.props.navPr)
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link
                      to="/"
                      duration={500}
                      onClick={this.scrollToOrganisateure}
                    >
                      ORGANISATEUR
                    </Link>
                  </li>
                  <li
                    className={
                      this.props.navDetailVideo || this.props.navBg
                        ? "menu-active"
                        : "undefined"
                    }
                  >
                    <Link to="/gallerie"> GALLERIE </Link>
                  </li>
                  <li
                    className={
                      this.props.navEvent ? "menu-active" : "undefined"
                    }
                  >
                    <Link to="/evenemet">EVENEMENTS</Link>
                  </li>
                  <li
                    className={
                      this.props.navContact ? "menu-active" : "undefined"
                    }
                  >
                    <Link to="/contact"> CONTACT </Link>
                  </li>
                  <li
                    className={this.props.navBlog ? "menu-active" : "undefined"}
                  >
                    <Link to="/blog"> BLOG </Link>
                  </li>

                  {this.props.isAuth.isAuthenticated === true ? (
                    this.props.admin === "chaieb.jasser@esprit.tn" ? (
                      <div style={{ marginLeft: 30 }}>
                        <Avatar
                          onClick={this.handleClick}
                          size={"large"}
                          src={`http://localhost:5000/${this.props.isAuth.adherent.userImage}`}
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
                          anchorEl={this.state.anchorEl}
                          keepMounted
                          open={Boolean(this.state.anchorEl)}
                          onClose={this.handleClose}
                          className="menu"
                          style={{
                            position: "absolute",

                            marginTop: 55,
                          }}
                        >
                          <MenuItem onClick={this.handleClose}>
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

                          <MenuItem onClick={() => this.props.logoutUser()}>
                            Se déconnecter
                          </MenuItem>
                        </Menu>
                      </div>
                    ) : this.props.isAuth.registred === true ? (
                      <div style={{ marginLeft: 30 }}>
                        <Avatar
                          onClick={this.handleClick}
                          size={"large"}
                          src={`http://localhost:5000/${this.props.isAuth.adherent.userImage}`}
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
                          anchorEl={this.state.anchorEl}
                          keepMounted
                          open={Boolean(this.state.anchorEl)}
                          onClose={this.handleClose}
                          className="menu"
                          style={{
                            position: "absolute",

                            marginTop: 55,
                          }}
                        >
                          <MenuItem onClick={this.handleClose}>
                            <Link
                              style={{
                                listStyle: "none",
                                color: "black",
                              }}
                              to={`/Profile/user/${this.props.isAuth.user.id}`}
                            >
                              Profile
                            </Link>
                          </MenuItem>

                          <MenuItem onClick={() => this.props.logoutUser()}>
                            Se déconnecter
                          </MenuItem>
                        </Menu>
                      </div>
                    ) : (
                      <div>
                        <div>
                          <Link
                            onClick={() => this.props.setModel()}
                            to="/"
                            style={{
                              textAlign: "center",
                              listStyle: "none",
                              fontSize: 11,
                              color: "white",
                              background: "#f82249",
                              padding: "7px 0px",
                              borderRadius: "50px",
                              border: "2px solid #f82249",
                              transition: "all ease-in-out 0.4s",
                              fontWeight: 500,
                              marginLeft: 8,
                              lineHeight: 1,
                            }}
                          >
                            Ajouter des évènements
                          </Link>
                          <SettingsIcon
                            onClick={this.handleClick}
                            style={{
                              color: "red",
                              cursor: "pointer",
                              fontSize: "25px",
                              marginTop: 2,
                              position: "fixed",
                              marginLeft: "30px",
                            }}
                          />
                        </div>

                        <Menu
                          style={{ marginTop: 55 }}
                          id="simple-menu"
                          anchorEl={this.state.anchorEl}
                          keepMounted
                          open={Boolean(this.state.anchorEl)}
                          onClose={this.handleClose}
                          className="menu"
                        >
                          <MenuItem onClick={this.handleClose}>
                            <Link
                              style={{
                                listStyle: "none",
                                color: "black",
                              }}
                              to={`/Profil/favorites/${this.props.isAuth.user.id}`}
                            >
                              Profile
                            </Link>
                          </MenuItem>

                          <MenuItem onClick={() => this.props.logoutUser()}>
                            Se déconnecter
                          </MenuItem>
                        </Menu>
                      </div>
                    )
                  ) : (
                    <li className="connexion">
                      <Link to="/sign-in">CONNEXION</Link>
                    </li>
                  )}
                </ul>
              </div>
              <div
                style={{
                  marginLeft: -20,
                  marginTop: 7,
                }}
                className="not-visibal-button"
              >
                <DrawerButton click={this.props.DrawerClickHandler} />
              </div>
            </nav>
          </header>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    actvieState: state.classReducer,
    isAuth: state.auth,
    admin: state.auth.user.email,
  };
};

export default connect(mapStateToProps, {
  setModel,
  activeClass,
  logoutUser,
  getAdhrent,
  removeModel,
})(Navbar);
