import React, { Component } from 'react';
import {
  Segment, Loader, Card, Icon, Input,
} from 'semantic-ui-react';
import Profile from "../components/auth/profile.component"

export default class SignIn extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="bodyDesktop" >
        <Segment style={{backgroundColor: '#222222'}}>
          <Profile/>
        </Segment>
        <div className="spacer" />
      </div>
    );
  }
}