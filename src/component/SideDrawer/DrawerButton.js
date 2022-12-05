import React from "react";
import "./DrawerButton.css";
import { setSideBar } from "../../actions/modelAction";
import { connect } from "react-redux";
const DrawerButton = (props) => (
  <button
    className="Toogle-Button"
    onClick={() => props.setSideBar(!props.state)}
  >
    <div className="Button-ligne" />
    <div className="Button-ligne" />
    <div className="Button-ligne" />
  </button>
);
const mapStateToProps = (state) => {
  return {
    state: state.modelReducer.side,
  };
};
export default connect(mapStateToProps, { setSideBar })(DrawerButton);
