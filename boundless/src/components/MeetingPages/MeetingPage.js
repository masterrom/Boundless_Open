import React, { Component } from 'react'
import {connect } from 'react-redux'
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import * as actions from '../../actions/settingsActions'

class MeetingPage extends Component {

  state = {
    userEmail: '',
    time: '',
    place: '',
    user: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    
    var info = this.state
    info.user = this.props.profile.email

    this.setState({
      userEmail: '',
      time: '',
      place: ''
    })

    this.props.createNewMeeting(info)
  }

  handleMeeting = (e) => {
    console.log(e.target.name);
    //here name == index
    this.props.acceptRequest(e.target.name)
  }
/*

presonRequested --> person that the user want to meet up with
requester   --> person that is requesting

0 --> if 0 and requester == user ==> users has asked is waiting for a response
1 --> if 1 and requester != user ==> user has been asked for a response (send response)
2 --> if 2 --> both parties have accepted

*/



  render() {

    if (this.props.meetings == null){
      return <div />
    }
    
    const { email } = this.props.profile
    
    return (
      <div className="container">
        <div className=" card" style={{padding: '3%'}}>
        
          <div className="card-panel">
            <h1>Meeting board</h1>
            <table>
              <thead>
                <tr>
                    <th>Meeting Requester</th>
                    <th>Time</th>
                    <th>Place</th>
                    <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {this.props.meetings[0].requestedMeetings.map((item, index) => {
                  if ((item.personRequested == email || item.requester == email)){
                    var check = 2
                    if (item.status == 2){
                      check = 2
                    }else if (email == item.personRequested){
                      //user need to accept
                      check = 1
                    }else if (email == item.requester) {
                      check = 0
                    }
                    return (
                      
                      <tr key={index}>
                        <td>{item.personRequested}</td>
                        <td>{item.time}</td>
                        <td>{item.place}</td>
                        <td>
                            <button
                              onClick={this.handleMeeting}
                              name={index}
                              disabled={(check == 0 || check == 2)}
                              className="waves-effect light-green accent-3 btn-small">
                              {check == 0? 'Waiting' : (check == 1? 'Accept' : 'Meeting Set')
                            }
                              

                            </button>
                        </td> 
                      </tr>
                    )
                  }
                })}

              </tbody>
            </table>
          </div>
          
          <div className="card-panel">
            <h2>Set Meeting</h2>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} type="text" id="userEmail" placeholder="Email of User" name="userEmail" />
              <input onChange={this.handleChange}  type="date" id="time" name="time" />
              <input onChange={this.handleChange}  type="text" id="place" name="place" placeholder="Meeting Place" />

              <input 
                type="submit"
                className="btn blue lighten-1 z-depth-0"
                value="Send Request"
              />
            </form>
          
          </div>
        
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    meetings: state.firestore.ordered.meetings,
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect((props) =>  [
    `meetings/meetings`
  ])
)(MeetingPage);



