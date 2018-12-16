import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";

import reducers from './reducers';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import TeamDetails from './container/nomination/TeamDetails';
import Alert from './container/Alert';
import Login from  './container/login';
import Profile from './container/profile';
import Guard from './container/guards';

class App extends Component {
  private store:any;
  constructor(props:any){
    super(props);
    this.store=createStore(reducers,{},applyMiddleware(logger));
  }
  render() {
    return (
        <Provider store={this.store}>
          <BrowserRouter>
            <span>
            <Alert/>
            <Switch>
              <Route path="/login" component={Login}/>
              <Guard path="/profile" component={Profile}/>
              <Guard path="/details" component={TeamDetails}/>

              <Redirect from="/" to="/login"/>
            </Switch>
            </span>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
