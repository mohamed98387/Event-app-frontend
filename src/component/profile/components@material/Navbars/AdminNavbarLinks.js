import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";

// @material-ui/icons
import Settings from "@material-ui/icons/Settings";

import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "../../components@material/CustomInput/CustomInput.js";
import Button from "../../components@material/CustomButtons/Button.js";
import { Link } from "react-router-dom";
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { logoutUser } from "../../../../actions/authActions";
import { connect } from "react-redux";
import "./nav.css";
const useStyles = makeStyles(styles);

const AdminNavbarLinks = (props) => {
  const classes = useStyles();

  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };
  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
            },
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={openProfile ? "profile-menu-list-grow" : null}
        aria-haspopup="true"
        onClick={handleClickProfile}
        className={classes.buttonLink}
      >
        <Settings className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Paramètre</p>
        </Hidden>
      </Button>
      <Poppers
        open={Boolean(openProfile)}
        anchorEl={openProfile}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !openProfile }) +
          " " +
          classes.popperNav
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="profile-menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseProfile}>
                <MenuList role="menu">
                  <MenuItem
                    onClick={handleCloseProfile}
                    className={classes.dropdownItem}
                  >
                    <Link
                      to="/"
                      className={
                        window.innerWidth > 959 ? "LinkHome" : "sideLinkHome"
                      }
                    >
                      Page D'acceuil
                    </Link>
                  </MenuItem>
                  <Divider light />
                  <MenuItem
                    onClick={onLogoutClick}
                    className={classes.dropdownItem}
                  >
                    Se déconnecter
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </div>
  );
};

export default connect(null, { logoutUser })(AdminNavbarLinks);
