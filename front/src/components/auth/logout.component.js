import React, { Component } from 'react';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
      }
      
  componentDidMount() {
    // Si on a reçu un token on le stocke , sinon on redirige vers le back pour l'avoir
    localStorage.clear();
    window.location.assign('/');
  }

  render() {
    return (<div>Vous allez être redirigé</div>);
  }
}