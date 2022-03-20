import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Input, Card,
} from 'semantic-ui-react';
import axios from 'axios';
import underscore from 'underscore';
import CardUser from './CardUser';

import config from '../../config.json';

class searchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `${config.back_Url}/users/`,
      headers: { Token: localStorage.getItem('killerToken') },
      params: {
        limit: 6,
        search: '',
        page: this.props.search
      },
    }).then((data) => {
      if (data.data.status === 200) {
        this.setState({
          users: data.data.object,
        });
      }
    });
  }

  handleSearch = (event) => {
    axios({
      method: 'get',
      url: `${config.back_Url}/users/`,
      headers: { Token: localStorage.getItem('killerToken') },
      params: {
        limit: 6,
        search: event.target.value,
        page: this.props.search
      },
    }).then((data) => {
      if (data.data.status === 200) {
        this.setState({
          users: data.data.object,
        });
      }
    });
  }

  handleClick = (user) => {
    this.props.handleSubmit(user);
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.handleSubmit(null)}
        closeOnEscape
        closeOnDimmerClick
        closeIcon
        style={{ width: '60vw', minHeight: '50vh', padding: '2em' }}
      >
        <Input focus placeholder="Search..." onChange={this.handleSearch} className="InputDesktop" size="large"/>
        <Card.Group doubling centered itemsPerRow={6} className="centered">
          {underscore.map(this.state.users,
            (user) => (
              <CardUser
                user={user}
                key={user.id}
                handleDelete={this.handleDeleteUser}
                action={this.handleClick}
              />
            ))}

        </Card.Group>
      </Modal>
    );
  }
}

searchUser.propTypes = {
  search: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,

};

export default searchUser;
