import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ReduxState } from "../../reducers/reduxState";
import "./Alert.css";

interface Props {
  error: any;
}

class Alert extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <span className="alert-fixed">
        {this.props.error && (
          <div className="alert alert-danger mt-4" role="alert">
            {this.props.error}
          </div>
        )}
      </span>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    error: state.error || ""
  };
}

export default connect(mapStateToProps)(Alert);
