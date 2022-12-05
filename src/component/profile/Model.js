import React from "react";
import MyVerticallyCenteredModal from "./Inputs";
import { connect } from "react-redux";
import { removeModel } from "../../actions/modelAction";
import { clearErrorsAdh } from "../../actions/authActions";

class ModelProfile extends React.Component {
  render() {
    return (
      <div>
        <MyVerticallyCenteredModal
          show={this.props.Model}
          onHide={() => this.props.removeModel()}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    Model: state.modelReducer.model,
    err: state.errors,
    user: state.auth,
  };
};

export default connect(mapStateToProps, {
  removeModel,
  clearErrorsAdh,
})(ModelProfile);
