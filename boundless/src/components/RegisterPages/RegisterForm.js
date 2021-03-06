import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/loginActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, Link, BrowserRouter, Switch, Route } from "react-router-dom";
import { Button } from "reactstrap";
import Home from "../homescreenPages/HomeScreen";
import Select from "react-select";
import { UToronto_courses, URyerson_courses} from '../../data/courses'

  const years = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5+", label: "5+" }
];
const school = [
  { value: "University of Toronto", label: "University of Toronto" },
  { value: "Ryerson University", label: "Ryerson University" },
];

const programs = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Statisticss", label: "Statistics" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Physics", label: "Physics" },
  { value: "Commerce", label: "Commerce" },
  { value: "Business", label: "Business" },
  { value: "Anthropology", label: "Anthropology" }
];

//comment
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",

      university: "",
      year: "",
      program: "",

      email: "",
      password: "",
      passwordConfirmation: "",

      courses: [],
      courseOverFlow: false

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

  handleSelection(type, option) {
    const selected = option.value;
    this.setState({ [type]: selected });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    if (this.state.password.length < 6) {
      alert("Password length must be greater than 6 characters.");
    } else if (this.state.password != this.state.passwordConfirmation) {
      alert("Confirmed password does not match.");
    } else {
      if (!this.state.email.includes("@") && this.state.email.includes(".")) {
        alert("Incorrect Email");
      } else {
        this.props.signUpUser(this.state);
      }
    }
    this.renderHome()
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


  handleAddCourse = option => {
    var updatedCourses = this.state.courses;

    if(updatedCourses.length < 6){
      if (updatedCourses.indexOf(option.value) == -1) {
        updatedCourses.push(option.value);
        this.setState({ courses: updatedCourses });
      }
    }else{
      this.setState({
        courseOverFlow: true
      })
    }


    console.log(this.state);
  };


  handleDelete = option => {
    var updatedCourses = this.state.courses;
    var indexToRemove = updatedCourses.indexOf(option);

    updatedCourses.splice(indexToRemove, 1);
    this.setState({ courses: updatedCourses, courseOverFlow: false });
    
    console.log(this.state);
  };

  render() {
    // console.log(this.props.auth);
    if (this.props.auth.uid) return <Redirect to="/" />;
    
    const {error} = this.props

    return (
      <div className="container center">
        <div className="grey-text text-darken-3 card-header">Register</div>
        <div className="row card-body">
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>

              <div className="form-group">
                <label className="control-label">First Name</label>
                <input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  type="text"
                  name="firstName"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="control-label">Last Name</label>
                <input
                  onChange={this.onChange}
                  value={this.state.lastName}
                  type="text"
                  name="lastName"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="control-label">University</label>
                <Select 
                  placeholder = "Select your University"
                  name = "university"
                  onChange={this.handleSelection.bind(this,"university")}
                  options={school}
                />
              </div>

              <div className="form-group">
                <label className="control-label">Year</label>
                <Select
                  placeholder="Select your Year"
                  // this.setState({ [e.target.name]: e.target.value });
                  name="year"
                  onChange={this.handleSelection.bind(this, "year")}
                  options={years}
                />
                {/* {this.state.lastName == "" ? (
              <label> Require Year</label>
            ) : null} */}
              </div>
              <div className="form-group">
                <label className="control-label">Program</label>

                <Select
                  placeholder="Select your Program"
                  value={this.state.type}
                  name="program"
                  onChange={this.handleSelection.bind(this, "program")}
                  options={programs}
                />
              </div>

              <div className="form-group">
                <label style={{color: error!=null? "red" : "" }}  className="control-label"  >
                  Email{error!=null? " (This email has already been registered": ""}</label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  type="text"
                  name="email"
                  className="form-control"
                />
              </div>

              <div className="Password-Form">
                <label className="Password-lbl">Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  type="password"
                  name="password"
                  className="form-control"
                />
                {this.state.password.length < 6 ? (
                  <label>We require more than 6 characters</label>
                ) : null}
              </div>

              <div className="Confirm-Form">
                <label className="Confirm-lbl">Confirm Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.passwordConfirmation}
                  type="password"
                  name="passwordConfirmation"
                  className="form-control"
                />
                {this.state.passwordConfirmation == this.state.password &&
                this.state.passwordConfirmation.length > 5 ? null : (
                  <label>This needs to match the given password</label>
                )}
              </div>

              <div className="form-group">
                <button
                  onClick={this.onChange}
                  className="btn blue lighten-1 z-depth-0"
                >
                  Register
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <label
            style={{color: this.state.courseOverFlow==true? 'red': ''}}
            className="Confirm-lbl">Add Courses{this.state.courseOverFlow==true? ' (Maximum 6 courses. Please delete one of the courses to add a new one)': ''}</label>
            { this.state.university == "University of Toronto"  ? 
              <Select
              placeholder="Add a course:"
              value={this.state.type}
              onChange={this.handleAddCourse}     
              options={UToronto_courses}
              />
              : 
              <Select
              placeholder="Add a course:"
              value={this.state.type}
              onChange={this.handleAddCourse}     
              options={URyerson_courses}
              />
             }
             <div style={{paddingTop: '1%'}} className="row">
                {this.state.courses.map(option => (
                    <div style={{padding: '1%'}}  className="col s4 btn-group">
                        <button className="btn btn-success">{option}</button>
                        <button
                          className="btn btn-danger"
                          onClick={this.handleDelete.bind(this, option)}
                        >
                      <FontAwesomeIcon icon="trash" />
                    </button>
                  </div>
                  ))}
                  

             </div>
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    error: state.loginReducer.error
  };
};

export default connect(
  mapStateToProps,
  actions
)(RegisterForm);
