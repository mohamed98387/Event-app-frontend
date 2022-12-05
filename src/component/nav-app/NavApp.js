import React, { Component } from "react";
import Navbar from "../Nvbar/Navbar";
import SideDrawer from "../SideDrawer/SideDarwer";
import BackDrop from "../Back-Drop/Back-Drop";
import { connect } from "react-redux";
import { setSideBar } from "../../actions/modelAction";
import ReactLoading from "react-loading";
class NavApp extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    fetch(`/api/adherent`)
      .then((res) => res.json())
      .then((json) => this.setState({ loading: true }));
  }

  DrawerToogleClickHandler = () => {
    this.props.setSideBar(!this.props.side.side);
  };
  BackDropClickHandler = () => {
    this.props.setSideBar(false);
  };
  render() {
    let BackDrop1;
    if (this.props.side.side) {
      BackDrop1 = <BackDrop click={this.BackDropClickHandler} />;
    }

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
          <div style={{ height: "100%" }}>
            <Navbar
              navBg={this.props.navBg}
              DrawerClickHandler={this.DrawerToogleClickHandler}
              navEvent={this.props.navEvent}
              navContact={this.props.navContact}
              navBlog={this.props.navBlog}
              navActive={this.props.navActive}
              navPr={this.props.navPr}
              navDetailVideo={this.props.navDetailVideo}
              // navProfile={}
            />
            <SideDrawer
              navEvent={this.props.navEvent}
              navContact={this.props.navContact}
              navBlog={this.props.navBlog}
              navActive={this.props.navActive}
              navBg={this.props.navBg}
              show={this.props.side.side}
            />
            {BackDrop1}
          </div>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setSideBar: () => dispatch(setSideBar()),
  };
};
const mapStateToProps = (state) => {
  return {
    side: state.modelReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavApp);
