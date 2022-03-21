import React, { Component } from 'react';
import {
  Grid, Sidebar, Menu, Icon,
} from 'semantic-ui-react';
import config from '../../config.json';
import logo from '../../img/logo.jpg';
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";
import "./navCSS.css"
const urlAccueil = `${config.front_Url}`;
// const urlUsers = `${config.front_Url}/users/`;
// const urlTeams = `${config.front_Url}/teams/`;
// const urlTeamCreation = `${config.front_Url}/createTeam`;
// const urlMessage = `${config.front_Url}/messages`;
const urlLogout = `${config.front_Url}/logout`;
// const urlKillFeed = `${config.front_Url}/killFeed`;
// const urlEnigmas = `${config.front_Url}/enigmas`;
const urlStory = `${config.front_Url}/story`;
// const urlRules = `${config.front_Url}/rules`;
// const urlSdM = `${config.front_Url}/salleDesMachines`;
// const urlRelique = `${config.front_Url}/relique`;
const urlActivities = `${config.front_Url}/activity`;

export default class NavBar extends Component {
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
        <Responsive as="div" {...Responsive.onlyComputer} >
          <Grid className="menu" verticalAlign="middle" style={{ height: '60px', background: '#111111', borderBlockColor: 'white'}}> 
            <Grid.Column width={2} style={{ padding: 0, height: '60px' }}>
              <a id="logolien" href={urlAccueil}><img src={logo} alt="logo" id="logo" mask="mask1"/></a>
            </Grid.Column>
            <Grid.Column width={12} textAlign="center" style={{ padding: 0, height: '60px' }}>
              <Grid textAlign="center" style={{ padding: 0, margin: 0, height: '60px' }}>
                <div style={{ display: 'flex' }}>
                <a className="linkNavbar" href={urlActivities}><div className="elem">Activités</div></a>
                {/* <a className="linkNavbar" href={urlStory}><div className="elem">Description</div></a> */}
                  {/* <a className="linkNavbar" href={urlUsers + localStorage.getItem('userId')}><div className="elem"> Mon profil</div></a>
                  {localStorage.getItem('teamId') === 'null'
                    ? <a className="linkNavbar" href={urlTeamCreation}><div className="elem">Créer une Team</div></a>
                    : <a className="linkNavbar" href={urlTeams + localStorage.getItem('teamId')}><div className="elem"> Ma Team</div></a>}
                  <a className="linkNavbar" href={urlUsers}><div className="elem">Joueurs</div></a>
                  <a className="linkNavbar" href={urlTeams}><div className="elem">Teams</div></a>
                  <a className="linkNavbar" href={urlMessage}><div className="elem">Messages</div></a>
                  <a className="linkNavbar" href={urlKillFeed}><div className="elem">Meurtres</div></a>
                  {localStorage.getItem('teamId') === 'null' ? null
                    : <a className="linkNavbar" href={urlEnigmas}><div className="elem">Énigmes</div></a>}
                  <a className="linkNavbar" href={urlStory}><div className="elem">Histoire</div></a>
                  <a className="linkNavbar" href={urlRules}><div className="elem">Règles</div></a>
                  <a className="linkNavbar" href={urlSdM}><div className="elem">Salle des Machines</div></a>
                  <a className="linkNavbar" href={urlRelique}><div className="elem">Relique</div></a> */}
                </div>
              </Grid>
            </Grid.Column>
            <Grid.Column width={2} style={{ padding: 0, height: '60px' }}>
              <a href={urlLogout} className="linkNavbarLogin"><div>Logout</div></a>
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive as="div" maxWidth={Responsive.onlyTablet.maxWidth}>
          <Grid className="menu" verticalAlign="middle" style={{ height: '60px', backgroundColor: '#111111', borderBlockColor: 'white' }}>
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
            <Menu.Item as="a" href={urlActivities}>
              <Icon name="trophy" />
              Activités
            </Menu.Item>
            {/* <Menu.Item as="a" href={urlStory}>
              <Icon name="book" />
              Histoire
            </Menu.Item> */}
            {/* <Menu.Item as="a" href={urlUsers + localStorage.getItem('userId')}>
              <Icon name="user circle" />
              Mon profil
            </Menu.Item>
            {localStorage.getItem('teamId') === 'null' ? (
              <Menu.Item as="a" href={urlTeamCreation}>
                <Icon name="user plus" />
                Créer une équipe
              </Menu.Item>
            ) : (
              <Menu.Item as="a" href={urlTeams + localStorage.getItem('teamId')}>
                <Icon name="user md" />
                Mon équipe
              </Menu.Item>
            )}
            <Menu.Item as="a" href={urlUsers}>
              <Icon name="user" />
              Joueurs
            </Menu.Item>
            <Menu.Item as="a" href={urlTeams}>
              <Icon name="users" />
              Équipes
            </Menu.Item>
            <Menu.Item as="a" href={urlMessage}>
              <Icon name="mail" />
              Message
            </Menu.Item>
            <Menu.Item as="a" href={urlKillFeed}>
              <Icon name="ambulance" />
              Meurtres
            </Menu.Item>
            {localStorage.getItem('teamId') === 'null' ? null
              : (
                <Menu.Item as="a" href={urlEnigmas}>
                  <Icon name="question" />
                  Énigmes
                </Menu.Item>
              )}
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
            </Menu.Item> */}
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
