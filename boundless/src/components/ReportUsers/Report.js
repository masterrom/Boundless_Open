import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ReportForm from "./ReportForm";
import { connect } from "react-redux";

export class Report extends Component {
  render() {
    return (
      <div className="card col-md-8 offset-md-2">
        <ReportForm />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(
  mapStateToProps,
  null
)(Report);
