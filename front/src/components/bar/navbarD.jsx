import React, { Component } from 'react';
import {
  Grid, Sidebar, Menu, Icon,
} from 'semantic-ui-react';
import config from '../../config.json';
import logo from '../../img/logo.jpg';
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";

const urlAccueil = `${config.front_Url}`;
const urlLogin = `${config.front_Url}/signIn`;
const urlSignUp = `${config.front_Url}/signUp`;

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleHideClick = () => this.setState({ visible: false })

  handleShowClick = () => this.setState({ visible: true })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Responsive as="div" {...Responsive.onlyComputer}>
          <Grid className="menu" verticalAlign="middle" style={{ height: '60px',background: '#111111', borderBlockColor: 'white'}}>
            <Grid.Column width={3} style={{ padding: 0, height: '60px' }}>
              
              <a id="logolien" href={urlAccueil}><img src={logo} alt="logo" id="logo" /></a>
              
            </Grid.Column>
            <Grid.Column width={3} verticalAlign="middle" style={{ padding: 0, height: '60px' }}>
              <div style={{ display: 'flex' }}>
                <a href={urlLogin} className="linkNavbarLogin"><div>Se connecter</div></a>
              </div>
            </Grid.Column>
            <Grid.Column width={3} style={{ padding: 0, height: '60px' }}>  
              <div style={{ display: 'flex' }}>
                <a href={urlSignUp} className="linkNavbarLogin"><div>S'inscrire</div></a>
              </div>
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive as="div" maxWidth={Responsive.onlyTablet.maxWidth}>
          <Grid className="menu" verticalAlign="middle" style={{ height: '60px', background: '#111111', borderBlockColor: 'white' }}>
            <Grid.Column width={3} style={{ padding: 0, height: '60px' }}>
              <a id="logolien" href={urlAccueil}><img src={logo} alt="logo" id="logo" /></a>
            </Grid.Column>
            <Grid.Column width={10} />
            <Grid.Column width={3} style={{ padding: 0, height: '60px' }}>
              <div className="linkNavbarLogin" onClick={this.handleShowClick} role="button" tabIndex={0}>
                <Icon name="align justify"/>
              </div>
            </Grid.Column>
          </Grid>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            direction="right"
            width="thin"
          >
            <Menu.Item as="a" href={urlAccueil}>
              <Icon name="home" />
              Accueil
            </Menu.Item>
            <Menu.Item as="a" href={urlSignUp}>
              <Icon name="sign in" />
              S'inscrire
            </Menu.Item>
            <Menu.Item as="a" href={urlLogin}>
              <Icon name="sign in" />
              Se connecter
            </Menu.Item>
          </Sidebar>
        </Responsive>
      </div>
    );
  }
}
