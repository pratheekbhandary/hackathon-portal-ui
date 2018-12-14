import axios from "axios";
import { History } from "history";
import React, { Component, MouseEvent } from "react";
import { Link } from "react-router-dom";

interface Props {
  history: History;
  authUser: string;
  authName: string;
}

interface State {}

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getUserNameToDisplay = this.getUserNameToDisplay.bind(this);
    this.logout = this.logout.bind(this);
  }
  getUserNameToDisplay() {
    let displayName = "";
    if (this.props.authUser && this.props.authName === "") {
      displayName = this.props.authUser + "@infosys.com";
    } else {
      displayName = this.props.authName;
    }
    return (
      <Link to="/profile">
        <span className="text-white">{displayName}</span>
      </Link>
    );
  }
  logout(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    axios.get("/api/logout", {
      headers: {
        "X-Hackathon-User": this.props.authUser
      }
    });
    this.props.history.push("/login");
  }
  render() {
    return (
      <header className="bg-primary d-flex p-2 text-white">
        <h3 className="mx-4">Allstate Hackathon Portal</h3>
        <span className="flex-fill" />
        <div className="d-flex align-items-center">
          <i className="mx-1 material-icons">account_circle</i>
          {this.getUserNameToDisplay()}
        </div>
        <a className="btn mx-2" onClick={this.logout}>
          <div className="d-flex align-items-center">
            <span>Log out</span>
            <i className="mx-1 material-icons">logout_icon</i>
          </div>
        </a>
      </header>
    );
  }
}

export default Header;
