import axios from "axios";
import React, {
  ChangeEvent,
  Component,
  createRef,
  FormEvent,
  MouseEvent
} from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ReduxState } from "../../reducers/reduxState";
import Header from "../header";
import Nomination from "./Nomination";
import "./TeamDetails.css";
interface Props extends RouteComponentProps {
  teamMembers: Array<string>;
  teamName: string;
  submittedDate: string;
  status: string;
  framework: string;
  nominationTitle: string;
  description: string;
  authUser: string;
  authName: string;
}

interface State {
  teamMembers: Array<string>;
  count: number;
  teamName: string;
  submittedDate: string;
  status: string;
  framework: string;
  nominationTitle: string;
  description: string;
  ideaSubmitted: boolean;
  fileRef: any;
}

class TeamDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      teamMembers: [],
      count: 1,
      teamName: "",
      submittedDate: "",
      status: "Not yet submitted",
      framework: "",
      nominationTitle: "",
      description: "",
      ideaSubmitted: false,
      fileRef: createRef()
    };
  }

  componentDidMount() {
    axios
      .get("/api/details/", {
        headers: {
          "X-Hackathon-User": this.props.authUser
        }
      })
      .then(
        res => {
          let date = "";
          if (res.data.submittedDate) {
            date = this.parsedDate(res.data.submittedDate);
          }
          this.setState({ ...res.data, submittedDate: date });
        },
        err => {
          console.error(err, "TeamDetailsPage");
          window.location.pathname = "/login";
        }
      );
  }

  getTeamMember = () => {
    const displayArray = [];
    for (let memberIndex = 0; memberIndex < this.state.count; memberIndex++) {
      const member = this.state.teamMembers[memberIndex];
      displayArray.push(
        <div className="row" key={member}>
          <div className="col">
            <div className="form-group row">
              <label
                htmlFor={`Team_Member_${memberIndex}`}
                className="col-sm-2"
              >
                Team Member {memberIndex + 1}
              </label>
              <div className="col-lg-8 input-group">
                <input
                  type="text"
                  className="form-control"
                  id={`Team_Member_${memberIndex}`}
                  name={`teamMembers[${memberIndex}]`}
                  autoComplete="off"
                  value={member}
                  required
                  readOnly={memberIndex === 0 || this.state.ideaSubmitted}
                  onChange={event =>
                    this.onChangeOfTeamMember(event, memberIndex)
                  }
                />
                <div className="input-group-append">
                  <span className="input-group-text">@infosys.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <span>{displayArray}</span>;
  };

  onChangeOfTeamMember = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const array = this.state.teamMembers;
    array[index] = event.target.value;
    this.setState({ teamMembers: array });
  };
 
  onChangeTeamName = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ teamName: event.target.value });
  };

  onCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value);
    if ([1, 2, 3].includes(count)) {
      this.setState({ count });
    }
  };

  onFrameworkChange = (e: any) => {
    this.setState({ framework: e.target.value });
  };

  onNominationTitleChange = (e: any) => {
    this.setState({ nominationTitle: e.target.value });
  };

  onDescriptionChange = (e: any) => {
    this.setState({ description: e.target.value });
  };

  onSubmitButton = (e: MouseEvent<HTMLButtonElement>) => {
    if (this.state.fileRef.current.files.length === 0) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.setState({ ideaSubmitted: true });
    }
  };

  onSaveButton = (e: MouseEvent<HTMLButtonElement>) => {
    this.setState({ ideaSubmitted: false });
  };

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

  isValid = () => {
    return (
      this.state.teamMembers &&
      this.state.teamName &&
      this.state.framework &&
      this.state.nominationTitle
    );
  };

  parsedDate = (date: any) => {
    const [, c_date, c_time] = date.match(
      /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/
    );
    return `${c_date} ${c_time}`;
  };

  sendFiles = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.isValid()) {
      return;
    }
    const ideaDocument = new FormData(e.currentTarget);
    axios
      .post("/api/save", ideaDocument, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Hackathon-User": this.props.authUser
        }
      })
      .then(
        res => {
          if (res.data.submittedDate) {
            const date = this.parsedDate(res.data.submittedDate);
            this.setState({ submittedDate: date });
          }
          if (res.data.status) {
            this.setState({ status: res.data.status });
          }
          alert("Thank you for you submission");
        },
        err => {
          console.error(err);
        }
      );
  };

  render() {
    return (
      <div>
        {this.logoutForm()}
        <div className="center">
          <form
            className="container"
            onSubmit={this.sendFiles}
            encType="multipart/form-data"
          >
            <input
              type="hidden"
              value={this.state.ideaSubmitted.toString()}
              name="ideaSubmitted"
            />

            <Nomination
              data={this.state}
              onFrameworkChange={this.onFrameworkChange}
              onNominationTitleChange={this.onNominationTitleChange}
              onDescriptionChange={this.onDescriptionChange}
              fileRef={this.state.fileRef}
            />
            <div className="row">
              <div className="col">
                <div className="form-group row">
                  <label htmlFor="Team Name" className="col-sm-4">
                    Team Name
                  </label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      className="form-control"
                      id="Team Name"
                      name="teamName"
                      autoComplete="off"
                      value={this.state.teamName}
                      onChange={this.onChangeTeamName}
                      required
                      readOnly={this.state.status === "SUBMITTED"}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="form-group row">
                  <label htmlFor="Team Size" className="col-sm-4">
                    Team Size
                  </label>
                  <div className="col-lg-4">
                    <input
                      type="number"
                      min="1"
                      max="3"
                      id="Team Size"
                      autoComplete="off"
                      value={this.state.count}
                      onChange={this.onCountChange}
                      required
                      readOnly={this.state.status === "SUBMITTED"}
                    />
                    <span className="col-lg-4">max(3)</span>
                  </div>
                </div>
              </div>
            </div>
            {this.getTeamMember()}
            <div className="row">
              <div className="m-auto">
                <button
                  type="submit"
                  className="btn btn-info"
                  id="saveIdea"
                  onClick={this.onSaveButton}
                  disabled={this.state.status === "SUBMITTED"}
                >
                  Save Idea
                </button>
                <button
                  type="submit"
                  className="btn btn-primary ml-3"
                  id="submitIdea"
                  onClick={this.onSubmitButton}
                  disabled={this.state.status === "SUBMITTED"}
                >
                  Submit Idea
                </button>
              </div>
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

export default connect(mapStateToProps)(TeamDetails);
