import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/loginActions";
import {BrowserView, MobileView} from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UncontrolledDropdown, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";


const SignedInLinks = props => {
  return (
    <div>
    <BrowserView>
    <ul className="right">
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/settings">Settings</NavLink>
      </li>
      <li>
        <NavLink to="/report">Report User</NavLink>
      </li>
      <li>
        <NavLink to="/meeting">Set Meeting</NavLink>
      </li>
      
      <li>
        <a onClick={props.signOut} href="/">Log Out</a>
      </li>
    </ul>
    </BrowserView>
    <MobileView>
    <UncontrolledDropdown>
      <DropdownToggle caret>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem><NavLink style={{color: "black"}} to="/home">Home</NavLink></DropdownItem>
        <DropdownItem><NavLink style={{color: "black"}} to="/settings">Settings</NavLink></DropdownItem>
        <DropdownItem><NavLink style={{color: "black"}} to="/report">Report User</NavLink></DropdownItem>
        <DropdownItem><NavLink style={{color: "black"}} to="/meeting">Set Meeting</NavLink></DropdownItem>
        <DropdownItem><a onClick={props.signOut} style={{color: "black"}} href="/">Log Out</a></DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
    
    </MobileView>
    </div>
  );
};

export default connect(
  null,
  actions
)(SignedInLinks);
