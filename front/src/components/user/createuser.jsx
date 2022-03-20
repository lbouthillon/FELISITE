import React, { Component } from 'react';
import {
  Segment, Form, Button, Portal, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config.json';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      room: '',
      pseudo: '',
      phone: '',
      school: '',
      message: null,
      variant: null,
      open: false,
      errorName: null,
      errorRoom: null,
      errorNumber: null,
    };
  }

  componentDidMount = () => {
    this.setState({
      token: this.props.match.params.token,
    });
  }

  handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  makeFeedback = (variant, message) => {
    this.setState({
      message,
      variant,
      open: true,
    });
    setTimeout(() => {
      this.setState({
        message: null,
        variant: null,
        open: false,
      });
    }, 5000);
  }

  handleSubmit = () => {
    const {
      room, pseudo, phone, token, school
    } = this.state;
    let errorName = null; let errorRoom = null; const
      errorNumber = null;

    if (/(^1([A-D]([1-4]0[1-9]|[2-4](1[0-9]|2[0-4]))|[ABD]11[0-7]|C11[0-5])$)|(^2([A-C][GD]|D|DD)([0-3]|[GD])([12]|[GD])(0[0-6]|[1-4][12]|)$)|(^3E?(([GD][0-3]|C[1-3])(0[1-9]|10)|C00[1-8])(A|B)?$)|(^4([AB]|C[A-E]|[D-H])[0-9]{3}$)|(^5A[0-9]{3}(-[0-9])?$)|(^6([AD][AB]|BA|CA)[1-5]0[1-6]$)|(PAS SUR LE CAMPUS)/.test(room) === false) {
      errorRoom = 'La chambre ne respecte pas la convention (Le numéro de la résidence, La lettre de la résidence, La lettre de l\'aile (si besoin), Numéro d\'étage, Numéro de chambre, Attention les lettres doivent être en majuscules. Si vous n\'êtes pas sur le campus contactez un MJ';
    }
    if (pseudo.length > 50) {
      errorName = 'Votre pseudo est trop long (50 car. max)';
    } else if (pseudo.length < 4) {
      errorName = 'Votre pseudo est trop court';
    }

    if (errorName !== null || errorRoom !== null) {
      this.setState({
        errorNumber, errorName, errorRoom,
      });
    } else {
      axios({
        method: 'post',
        url: `${config.back_Url}/users`,
        headers: { 'Content-Type': 'application/json' },
        data: {
          token,
          pseudo,
          room,
          phone,
          school
        },
      }).then((response) => {
        if (response.data.status === 201) {
          window.location.assign(`${config.front_Url}/login/${response.data.object}`);
        } else if (response.data.status === 400) {
          this.makeFeedback(
            'negative',
            response.data.message,
          );
        } else {
          this.makeFeedback(
            'negative',
            "Le compte n'a pas pu être créé",
          );
        }
      });
    }
  }

  render() {
    const { variant, message, open } = this.state;
    return (
      <div className="bodyDesktop">
        <div className="BigSpace">
          <Segment>
            <h2>Inscription joueur</h2>
            <Portal open={open}>
              <Message
                style={{
                  left: '20px',
                  position: 'fixed',
                  bottom: '20px',
                  zIndex: 1000,
                }}
                negative={variant === 'negative'}
                positive={variant === 'positive'}
              >
                <Message.Header>{variant === 'negative' ? 'Une erreur est survenue' : "Tout s'est déroulé comme prévu"}</Message.Header>
                {message}
              </Message>
            </Portal>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Pseudo</label>
                <Form.Input placeholder="pseudo" name="pseudo" onChange={this.handleChange} error={this.state.errorName} />
              </Form.Field>
              <Form.Field>
                <label>Chambre</label>
                <Form.Input placeholder="Chambre" name="room" onChange={this.handleChange} error={this.state.errorRoom} />
              </Form.Field>
              <Form.Field>
                <label>Numéro de téléphone</label>
                <Form.Input type="number" placeholder="Numéro" name="phone" onChange={this.handleChange} error={this.state.errorNumber} />
              </Form.Field>
              <Form.Field>
                <label>ST/Mention/Césure/Electifs</label>
                <Form.Input placeholder="ST/mention/césure/Electif" name="school" onChange={this.handleChange}/>
              </Form.Field>
              <Button type="submit">Créer mon profil</Button>
            </Form>
          </Segment>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.shape({
      replace: PropTypes.func,
    }),
    params: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,

  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape({
        pathname: PropTypes.shape({
          replace: PropTypes.func,
        }),
      }),
    }),
  }).isRequired,
};

export default CreateUser;
