import axios from "axios";
import React, { ChangeEvent, Component, FormEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Action, Dispatch } from "redux";
import { userLogin } from "../../actions";
import { ReduxState } from "../../reducers/reduxState";
import Header from "../header";
import "./Profile.css";
interface Props extends RouteComponentProps {
  authUser: string;
  updateUser: Function;
  authName: string;
}

interface State {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  manager: string;
}

class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      manager: ""
    };

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onMobileNumberChange = this.onMobileNumberChange.bind(this);
    this.onAlternateEmailChange = this.onAlternateEmailChange.bind(this);
    this.onManagerEmailChange = this.onManagerEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/profile", {
        headers: {
          "X-Hackathon-User": this.props.authUser
        }
      })
      .then(
        response => {
          this.setState({ ...response.data });
        },
        () => {
          window.location.pathname = "/login";
        }
      );
  }

  onFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ firstName: event.target.value });
  }
  onLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ lastName: event.target.value });
  }
  onMobileNumberChange(event: ChangeEvent<HTMLInputElement>) {
    const mobile = event.target.value;
    const pattern = /^\d*$/;
    if (pattern.test(mobile)) {
      this.setState({ mobile });
    }
  }

  onAlternateEmailChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }
  onManagerEmailChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ manager: event.target.value });
  }
  onSubmit(event: FormEvent<HTMLButtonElement | HTMLFormElement>) {
    event.preventDefault();
    axios
      .post(
        "/api/profile",
        {
          author: { ...this.state }
        },
        {
          headers: {
            "X-Hackathon-User": this.props.authUser
          }
        }
      )
      .then(
        res => {
          this.props.updateUser(res.data.name, this.props.authUser);
          this.props.history.push("/details");
        },
        (err: any) => console.error(err)
      );
  }

  isInvalid() {
    return (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.mobile ||
      !this.state.manager
    );
  }
  logoutForm() {
    if (this.props.authUser) {
      return (
        <div>
          <Header
            authUser={this.props.authUser}
            authName={this.props.authName}
            history={this.props.history}
          />
        </div>
      );
    }
  }
  render() {
    return (
      <div className="profile-container">
        {this.logoutForm()}
        <div className="row mt-4">
          <form className="col-8 m-auto" onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  value={this.state.firstName}
                  onChange={this.onFirstNameChange}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  value={this.state.lastName}
                  onChange={this.onLastNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Alternate E-mail (Optional)</label>
              <input
                id="email"
                type="email"
                className="form-control"
                autoComplete="off"
                value={this.state.email}
                onChange={this.onAlternateEmailChange}
              />
              <small className="form-text text-muted">
                Example: E-mail (will be used only for notification)
              </small>
            </div>
            <div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <i className="input-group-text">
                    <span className="material-icons">phone_android</span>
                  </i>
                </div>
                <input
                  id="mobile"
                  type="text"
                  className="form-control"
                  placeholder="Mobile Number"
                  pattern="[1-9]{1}[0-9]{9}"
                  autoComplete="off"
                  value={this.state.mobile}
                  onChange={this.onMobileNumberChange}
                  required
                />
              </div>
              <small className="form-text text-muted">
                Please provide ten digits mobile number.
              </small>
            </div>
            <div className="input-group my-4">
              <input
                id="manager"
                type="text"
                className="form-control"
                placeholder="Manager"
                autoComplete="off"
                value={this.state.manager}
                onChange={this.onManagerEmailChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">@infosys.com</span>
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={this.isInvalid()}
                onSubmit={this.onSubmit}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    authUser: state.user.email,
    authName: state.user.name
  };
}

function mapDispatchProps(dispatch: Dispatch<Action>) {
  return {
    updateUser: (name: string, email: string) =>
      dispatch(userLogin({ name, email }))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Profile);
