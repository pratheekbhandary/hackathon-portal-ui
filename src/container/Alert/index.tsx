import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ReduxState } from "../../reducers/reduxState";
import "./Alert.css";
import { Dispatch, Action, bindActionCreators } from "redux";

import {clearError} from "../../actions";

interface Props {
  alert: { message: string; type: string };
  clearError: Function;
}

class Alert extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        {this.props.alert.type === "SUCCESS" && (
          <div className="myAlert-top alert-success">
            <a
              onClick={()=>this.props.clearError()}
              className="close order-3"
              data-dismiss="alert"
              aria-label="close"
            >
              &times;
            </a>
            <div className="d-flex justify-content-center flex-grow-1"><strong>Success!</strong>{this.props.alert.message}</div>
          </div>
        )}
        {this.props.alert.type === "ERROR" && (
          <div className="myAlert-bottom alert-danger">
            <a
              onClick={()=>this.props.clearError()}
              className="close order-3"
              data-dismiss="alert"
              aria-label="close"
            >
              &times;
            </a>
            <div className="d-flex justify-content-center flex-grow-1"><strong>Danger!</strong> {this.props.alert.message}</div>
          </div>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    alert: state.alert || ""
  };
}

function mapDispatchToProps(dispatch:Dispatch<Action>){
  return bindActionCreators({clearError},dispatch);
}
//@ts-ignore
export default connect(mapStateToProps,mapDispatchToProps)(Alert);
