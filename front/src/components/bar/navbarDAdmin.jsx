import React, { Component } from 'react';
import {
  Grid, Sidebar, Menu, Icon,
} from 'semantic-ui-react';
import config from '../../config.json';
import logo from '../../img/logo.jpg';
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";

const urlAccueil = `${config.front_Url}`;
const urlUsers = `${config.front_Url}/admin/users`;
const urlTeam = `${config.front_Url}/admin/teams`;
const urlKill = `${config.front_Url}/admin/kills`;
const urlMessage = `${config.front_Url}/admin/messages`;
const urlGestion = `${config.front_Url}/admin/gestion`;
const urlKillFeed = `${config.front_Url}/admin/killFeed`;
const urlAfk = `${config.front_Url}/admin/afk`;
const urlStats = `${config.front_Url}/admin/stats`;
const urlLogout = `${config.front_Url}/logout`;
const urlStory = `${config.front_Url}/story`;
const urlRules = `${config.front_Url}/rules`;
const urlSdM = `${config.front_Url}/salleDesMachines`;
const urlRelique = `${config.front_Url}/relique`;

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
          <Grid className="menu" verticalAlign="middle" style={{ height: '70px', background: 'linear-gradient(180deg, rgba(34,34,34,1) 0%, rgba(34,34,34,1) 80%, rgba(34,34,34,0) 100%)', border:'none' }}>
            <Grid.Column width={2} style={{ padding: 0, height: '60px' }}>
              <a id="logolien" href={urlAccueil}><img src={logo} alt="logo" id="logo" /></a>
            </Grid.Column>
            <Grid.Column width={12} textAlign="center" style={{ padding: 0, height: '60px' }}>
              <Grid textAlign="center" style={{ padding: 0, margin: 0, height: '60px' }}>
                <div style={{ display: 'flex' }}>
                  <a className="linkNavbar" href={urlUsers} onClick={this.handleClick}><div className="elem">Joueurs</div></a>
                  <a className="linkNavbar" href={urlTeam} onClick={this.handleClick}><div className="elem">Équipes</div></a>
                  <a className="linkNavbar" href={urlKill} onClick={this.handleClick}><div className="elem">Kill</div></a>
                  <a className="linkNavbar" href={urlGestion} onClick={this.handleClick}><div className="elem">Gestion</div></a>
                  <a className="linkNavbar" href={urlMessage} onClick={this.handleClick}><div className="elem">Messages</div></a>
                  <a className="linkNavbar" href={urlKillFeed}><div className="elem">Meurtres</div></a>
                  <a className="linkNavbar" href={urlAfk}><div className="elem">Afk</div></a>
                  <a className="linkNavbar" href={urlStats}><div className="elem">Stats</div></a>
                  <a className="linkNavbar" href={urlStory}><div className="elem">Histoire</div></a>
                  <a className="linkNavbar" href={urlRules}><div className="elem">Règles</div></a>
                  <a className="linkNavbar" href={urlSdM}><div className="elem">Salle des Machines</div></a>
                  <a className="linkNavbar" href={urlRelique}><div className="elem">Relique</div></a>
                </div>
              </Grid>
            </Grid.Column>
            <Grid.Column width={2} style={{ padding: 0, height: '60px' }}>
              <a href={urlLogout} className="linkNavbarLogin"><div>Logout</div></a>
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive as="div" maxWidth={Responsive.onlyTablet.maxWidth}>
          <Grid className="menu" verticalAlign="middle" style={{ height: '60px', backgroundColor: '#222222' }}>
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
            onClick={this.handleSidebarHide}
            vertical
            visible={visible}
            direction="right"
            width="thin"
          >
            <Menu.Item as="a" href={urlAccueil}>
              <Icon name="home" />
              Accueil
            </Menu.Item>
            <Menu.Item as="a" href={urlUsers}>
              <Icon name="user" />
              Joueurs
            </Menu.Item>
            <Menu.Item as="a" href={urlTeam}>
              <Icon name="users" />
              Équipes
            </Menu.Item>
            <Menu.Item as="a" href={urlKill}>
              <Icon name="fire" />
              Kill
            </Menu.Item>
            <Menu.Item as="a" href={urlGestion}>
              <Icon name="settings" />
              Gestion
            </Menu.Item>
            <Menu.Item as="a" href={urlMessage}>
              <Icon name="mail" />
              Message
            </Menu.Item>
            <Menu.Item as="a" href={urlKillFeed}>
              <Icon name="ambulance" />
              Meurtres
            </Menu.Item>
            <Menu.Item as="a" href={urlAfk}>
              <Icon name="user outline" />
              Afk
            </Menu.Item>
            <Menu.Item as="a" href={urlStats}>
              <Icon name="line graph" />
              Stats
            </Menu.Item>
            <Menu.Item as="a" href={urlStory}>
              <Icon name="book" />
              Histoire
            </Menu.Item>
            <Menu.Item as="a" href={urlRules}>
              <Icon name="legal" />
              Règles
            </Menu.Item>
            <Menu.Item as="a" href={urlSdM}>
              <Icon name="cogs" />
              Salle des Machines
            </Menu.Item>
            <Menu.Item as="a" href={urlRelique}>
              <Icon name="chess" />
              Relique
            </Menu.Item>
            <Menu.Item as="a" href={urlLogout}>
              <Icon name="log out" />
              Se déconnecter
            </Menu.Item>
          </Sidebar>
        </Responsive>
      </div>
    );
  }
}
