import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Card, Image, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import nouser from '../../img/nouser.png';
import dead from '../../img/dead.png';
import afk from '../../img/afk.png';
import prime from '../../img/wanted.png';

const defaultF = () => {
};

class CardUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null, del: false,
        };
    }

    componentDidMount() {
    }

    setRedirect = (uri) => {
        this.setState({
            redirect: uri,
        });
    }

    renderRedirect = () => {
        if (this.state.redirect != null && !this.state.del) {
            window.location.assign(this.state.redirect)
        }
        return null;
    }

    render() {
        const {user} = this.props;
        const wanted = this.props.wanted;
        const actionFct = this.props.action === defaultF ? undefined : this.props.action;
        const clickable = actionFct !== undefined;
        const uri = this.props.admin ? '/admin/users/' : '/users/';
        return (
            <Card onClick={clickable ? () => actionFct(user) : () => this.setRedirect(uri + user.id)}>
                {this.renderRedirect()}
                <Image src={user.picture === null ? nouser : user.picture}
                       style={{height: "170px", objectFit: "cover"}}/>
                <Image src={user.alive ? null : dead} style={{position: 'absolute', height: "170px", width: "100%"}}/>
                <Image src={user.afk ? afk : null} style={{position: 'absolute', height: "170px", width: "100%"}}/>
                <Image src={wanted === true ? prime : null} style={{position: 'absolute', height: "170px", width: "100%"}}/>
                {(this.props.admin || this.props.TeamLeader) && this.props.handleDelete !== undefined ? <div style={{position: "absolute", width: "100px", height: "100px"}} onClick={() => {
                    this.setState({del: true});
                    this.props.handleDelete(user.username);
                }}>
                    <div style={{
                        width: 0,
                        height: 0,
                        borderTop: "30px solid white",
                        borderBottom: "30px solid transparent",
                        borderLeft: "30px solid white",
                        borderRight: "30px solid transparent",
                        position: "absolute"
                    }}/>
                    <i className="trash icon"
                       style={{position: "absolute", top: "10px", left: "10px", color: 'black'}}/></div> : <></>}

                <Card.Content>
                    <Card.Header>{user.pseudo}</Card.Header>
                    <Card.Meta>{`${user.lastName} ${user.firstName}`}</Card.Meta>
                    <Card.Description>
                        <Icon name="trophy"/>
                        {' '}
                        {user.score}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Card.Description>
                        <Icon name="crosshairs"/>
                        {user.nbKill}
                        {' '}
                        /
                        <Icon name="times"/>
                        {user.nbDeath}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

CardUser.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        pseudo: PropTypes.string,
        room: PropTypes.string,
        admin: PropTypes.oneOf(['JOUEUR', 'ADMIN', 'SUPERADMIN']),
        alive: PropTypes.bool,
        afk: PropTypes.bool,
        afkScore: PropTypes.number,
        teamId: PropTypes.number,
        phone: PropTypes.string,
        picture: PropTypes.string,
        username: PropTypes.string,
        lastName: PropTypes.string,
        firstName: PropTypes.string,
        nbKill: PropTypes.number,
        nbDeath: PropTypes.number,
        score: PropTypes.number,
    }).isRequired,
    action: PropTypes.func,
    admin: PropTypes.bool,
    handleDelete: PropTypes.func,
    TeamLeader: PropTypes.bool,
};

CardUser.defaultProps = {
    admin: false,
    action: defaultF,
};

export default CardUser;
