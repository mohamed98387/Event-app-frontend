import React from "react";
import NavApp from "../nav-app/NavApp";
import CarouselImg from "../carousel/CarouselImg";
import Apropos from "../A propos/Apropos";
import EventsProche from "../event-proche/EventsPr";
import Createur from "../createur/Createur";
import Newslater from "../Newslater/Newlater";
import Footer from "../footer/Footer";
import BackTop from "../Back-to-top/BackTop";
import ReactLoading from "react-loading";

import { connect } from "react-redux";
import { getAllEvents, megreArray } from "../../actions/EventActions";
import { getAllAdherent } from "../../actions/authActions";

class Index extends React.Component {
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
    // this.props.getAllAdherent();
    // this.props.getAllEvents();
    // this.props.mergreTable();
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
          <div>
            <NavApp navActive={this.props.match.url} />
            <CarouselImg />
            <Apropos />
            <EventsProche />
            <Createur />
            <Newslater />
            <Footer />
            <BackTop />
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { getAllAdherent, getAllEvents, megreArray })(
  Index
);
