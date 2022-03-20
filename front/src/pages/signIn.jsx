import React, { Component } from 'react';
import {
  Segment, Loader, Card, Icon, Input,
} from 'semantic-ui-react';
import Login from "../components/auth/login.component"

export default class SignIn extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="bodyDesktop" >
        <Segment style={{backgroundColor: '#222222'}}>
          <Login/>
        </Segment>
        <div className="spacer" />
      </div>
    );
  }
}