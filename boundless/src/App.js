import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import login from "./components/loginPages/login";
import NavBar from "./components/navBar/navBar";
import Register from "./components/RegisterPages/Register";
import Home from "./components/homescreenPages/HomeScreen";
import Settings from "./components/SettingsPage/Settings";
import Chatroom from "./components/chatroomPages/Chatroom";
import Report from "./components/ReportUsers/Report";
import MeetingPage from "./components/MeetingPages/MeetingPage";

const bgimage = require("./white-waves.png");
class App extends Component {
  render() {
    document.getElementsByTagName("html")[0].style.backgroundImage = `url(${bgimage})`;
    document.getElementsByTagName("html")[0].style.backgroundSize = "cover";
    document.getElementsByTagName("html")[0].style.height = "100%";
    return (
      <BrowserRouter>
        <div
          className="App"
          style={{ maxHeight: "inherit", backgroundImage: `url(${bgimage})`}}
        >
          <NavBar />
          <Switch>
            <Route exact path="/" component={login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/report" component={Report} />
            <Route path="/settings" component={Settings} />
            <Route path="/chatroom" component={Chatroom} />
            <Route path='/meeting' component={MeetingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
