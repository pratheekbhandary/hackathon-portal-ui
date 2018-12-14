import React, { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { ReduxState } from "../../reducers/reduxState";

interface Props {
  component: ComponentType<any>;
  path: string;
  isAuthenticated: boolean;
}

class Guard extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { component: Component, path } = this.props;
    if (this.props.isAuthenticated) {
      return <Route path={path} component={Component} />;
    }
    return <Redirect to="/login" />;
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    isAuthenticated: (state.user.email && state.user.email.length > 0) || false
  };
}

export default connect(mapStateToProps)(Guard);
