import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/settingsActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, Link, BrowserRouter, Switch, Route } from "react-router-dom";
import { Button } from "reactstrap";
import Home from "../homescreenPages/HomeScreen";
import Select from "react-select";

const reason = [
  { value: "Abuse", label: "Abusive Chat" },
  { value: "Troll", label: "Trolling" },
  { value: "Stalk", label: "Harassment" },
  { value: "Toxic", label: "Toxic" },
  { value: "Death Threats", label: "Death Threats" }
];

/*
var {
  firstName,
  lastName,
  email,
  year,
  university,
  program,
  courses
} 
*/
//const courses = { courses: this.state.courses };
//comment
class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      chatroom: "",
      reason: "",
      comments: ""
      //done: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log('updated state: ' + JSON.stringify(this.state));
  }

  //send to different collections
  handleSelection(type, option) {
    const selected = option.value;
    this.setState({ [type]: selected });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const reportUserInfo = {
      userName: this.state.userName,
      chatroom: this.state.chatroom,
      reason: this.state.reason,
      comments: this.state.comments
    };
    this.props.reportUser(reportUserInfo);
    this.renderHome();
    this.setState({
      userName: "",
      chatroom: "",
      reason: "",
      comments: ""
    });
  }

  renderHome() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }

  render() {
    // console.log(this.props.auth);
    //if (this.props.auth.uid) return <Redirect to="/" />;
    return (
      <div className="container center">
        <div className="grey-text text-darken-3 card-header">Report User</div>
        <form className="card-body" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="control-label">UserName</label>
            <input
              onChange={this.onChange}
              value={this.state.userName}
              type="text"
              name="userName"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="control-label">Course Chatroom</label>
            <input
              onChange={this.onChange}
              value={this.state.chatroom}
              type="text"
              name="chatroom"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="control-label">Reason for Report</label>
            <Select
              placeholder="Select your Report"
              name="reason"
              onChange={this.handleSelection.bind(this, "reason")}
              options={reason}
            />
          </div>

          <div className="form-group">
            <label className="control-label">Additional Comments</label>
            <input
              onChange={this.onChange}
              value={this.state.comments}
              type="textarea"
              name="comments"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <button
              onClick={this.onSubmit}
              className="btn blue lighten-1 z-depth-0"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(ReportForm);
