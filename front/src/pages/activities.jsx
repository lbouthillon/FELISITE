import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import logo from '../img/jdr.png';
import background from '../img/background.png';
import CardActivity from '../components/activity/CardActivity';
import {
  Segment, Loader, Card, Icon, Input,
} from 'semantic-ui-react';
import axios from 'axios';
import underscore from 'underscore';
import config from '../config.json';
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";

export default class Activities extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      loading: true,
      search: [],
      val: '',
      sort: 'name',
    };
  }

  componentDidMount() {
    this.fetchData(0);
  }

  fetchData = (offset) => {
    axios({
      method: 'get',
      url: `${config.back_Url}/activity`,
      headers: { Token: localStorage.getItem('killerToken') },
      params: {
        offset,
      },
    }).then((data) => {
      if (data.data.status === 200) {
        const value = this.state.val.toLowerCase();
        const search = [];
        const arr = [
          ...this.state.activities,
          ...data.data.object,
        ];

        arr.forEach((activity) => {
          if (activity.name.toLowerCase().indexOf(value) > -1) {
            search.push(activity);
          }
        });

        if (data.data.object.length === 10) {
          this.setState({
            loading: true,
            activities: arr,
            search,
          });
          this.fetchData(offset + 10);
        } else {
          this.setState({
            activities: arr,
            search,
            loading: false,
          });
        }
      }
    });
  }

  // handleChange = (event, data) => {
  //   const value = data.value.toLowerCase();
  //   const search = [];
  //   this.state.activities.forEach((activity) => {
  //     if (activity.name.toLowerCase().indexOf(value) > -1) {
  //       search.push(activity);
  //     }
  //   });
  //   this.setState({
  //     search,
  //     val: data.value,
  //   });
  // }

  // handleChangeSort = (event) => {
  //   this.setState({
  //     sort: event.target.value,
  //   });
  // }


  render() {
    if (this.state.activities == null) {
      return (
        <Segment className="Loading">
          <Loader active className="test">Loading</Loader>
        </Segment>
      );
    }


    const { sort, search } = this.state;

    let ActivitiesToPrint = [];

    

    
    ActivitiesToPrint = search.sort((a, b) => a.name < b.name);
  

    const Activities = () => underscore.map(ActivitiesToPrint, (activity) => (
      <CardActivity activity={activity} key={activity.id} />));

    return (
      <div className="bodyDesktop" >
        <Segment style={{backgroundColor: '#222222'}}>
          <h2 style = {{color: 'white'}}>Activités</h2>
          {/* <Input focus placeholder="Search..." onChange={this.handleChange} className="InputDesktop" size="large" />
          <select className="InputDesktop SelectDesktop ui selection dropdown" onChange={this.handleChangeSort}>
            <option selected value="name">Nom</option>
            <option value="score">Nombre de points</option>
            <option value="nobles">Nobles</option>
            <option value="ouvriers">Ouvriers</option>
            <option value="amets">Amets</option>
          </select> */}
          <>
            <Responsive  as="div" minWidth={1001}>
              <Card.Group centered itemsPerRow={2} className="centered">
                {Activities()}
              </Card.Group>
            </Responsive>
            {/* <Responsive as="div" minWidth={501} maxWidth={701}>
              <Card.Group centered itemsPerRow={3} className="centered">
                {Activities()}
              </Card.Group>
            </Responsive>
            <Responsive as="div" minWidth={701} maxWidth={1001}>
              <Card.Group centered itemsPerRow={4} className="centered">
                {Activities()}
              </Card.Group>
            </Responsive> */}
            <Responsive as="div" maxWidth={1001}>
              <Card.Group centered itemsPerRow={1} className="centered">
                {Activities()}
              </Card.Group>
            </Responsive>
          </>
          {this.state.loading
            ? (
              <div className="SmallLoading">
                <Icon size="large" loading name="redo" />
                <p>Loading...</p>
              </div>
            )
            : null}
        </Segment>
        <div className="spacer" />
      </div>
    );
  }
}