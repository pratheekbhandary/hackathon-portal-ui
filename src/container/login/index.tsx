import axios from "axios";
import React, { ChangeEvent, Component, FormEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Action, Dispatch } from "redux";
import { userLogin, throwError, clearError } from "../../actions";
//import logo from "../../img/Infosys-Logo.gif";
import "./Login.css";

interface Props extends RouteComponentProps {
  updateUser: Function;
  clearError: Function;
  throwError: Function;
}

interface State {
  userName: string;
  password: string;
}

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ userName: event.target.value });
  }

  onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value });
  }

  onLogin(event: FormEvent<HTMLButtonElement | HTMLFormElement>) {
    event.preventDefault();
    this.props.clearError();
    axios
      .post(
        "/api/login",
        { username: this.state.userName },
        {
          auth: {
            username: this.state.userName,
            password: this.state.password
          }
        }
      )
      .then(
        response => {
          this.props.updateUser(response.data.name, this.state.userName);
          if (response.data.name.length === 0) {
            this.props.history.push("/profile");
          } else {
            this.props.history.push("/details");
          }
        },
        (reason: any) => {
          this.props.throwError("Please enter valid credentials");
          console.error(reason);
        }
      );
  }

  render() {
    return (
      <div className="row m-0 login-form-container">
        <div className="border-right col-6 media">
          {/*<img src={logo} alt="Infosys Logo" className="m-auto" />*/}
        </div>
        <div className="login-form-container col-5 p-4 m-auto d-flex flex-column justify-content-center">
          <div className="row">
            <i className="material-icons login-icon text-primary">
              account_circle
            </i>
          </div>
          <form onSubmit={this.onLogin}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Infosys E-mail"
                autoComplete="off"
                value={this.state.userName}
                onChange={this.onUsernameChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">@infosys.com</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" />
              <input
                id="password"
                type="password"
                className="form-control"
                aria-describedby="password-message"
                autoComplete="off"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
              <small id="password-message" className="form-text text-muted">
                Don't use Infosys password
              </small>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-primary"
                type="submit"
                onSubmit={this.onLogin}
                disabled={!this.state.userName || !this.state.password}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchProps(dispatch: Dispatch<Action>) {
  return {
    updateUser: (name: string, email: string) =>
      dispatch(userLogin({ name, email })),
    throwError: (error: string) => dispatch(throwError(error)),
    clearError: () => dispatch(clearError())
  };
}

export default connect(
  null,
  mapDispatchProps
)(Login);
