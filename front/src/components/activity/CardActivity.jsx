import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Icon } from 'semantic-ui-react';

class CardActivity extends Component {
    render() {
      const { activity } = this.props;
      const uri = '/activity/';
      const cutDescription = activity.description.substr(0,1024) + '...';
      return (
        <Card href={uri + activity.id} style={{backgroundColor: '#111111'}}>
          <Card.Content>
            <Card.Header style = {{color: 'white'}}>{activity.name}</Card.Header>
            <Card.Description style = {{color: 'white'}}>
                {cutDescription}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    }
  }
  
  CardActivity.propTypes = {
    activity: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  };

  CardActivity.defaultProps = {
    activity: {
        id: 0,
        name: "defaultActivity",
        description: "activité de test",
    }
  };
  
  export default CardActivity;