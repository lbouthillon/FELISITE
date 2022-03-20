import React, {Component} from 'react';
import {Button, Divider, Form, Header, Icon, List, Message, Portal, Table,} from 'semantic-ui-react';
import axios from 'axios';
import config from '../../config.json';
import ImageUploader from '../utils/ImageUploader';

class UserGestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: '',
            room: '',
            admin: null,
            alive: false,
            afk: false,
            afkScore: 'null',
            roomError: false,
            showModal: false,
            teamId: null,
            message: '',
            variant: 'negative',
            open: false,
            phone: '',
            userSkills: [],
            allSkills: [],
            showSkills: false,
            experience: 0,
            school: "",
            allAchievements: [],
            userAchievements: [],
            showAchievements: false,
        };
    }

    makeFeedback = (variant, message) => {
        this.setState({
            message,
            variant,
            open: true,
        });
        setTimeout(() => {
            this.setState({
                message: '',
                variant: 'positive',
                open: false,
            });
        }, 5000);
    }

    handleSubmitPicture = (data) => {
        if (data.object && 'picture' in data.object) {
            this.props.updatePic(data.picture);
        }
        this.setState({showModal: false});
    }

    handleSubmit = () => {
        const {
            room, pseudo, admin, alive, afk, afkScore, phone, experience, school
        } = this.state;
        if (/(^1([A-D]([1-4]0[1-9]|[2-4](1[0-9]|2[0-4]))|[ABD]11[0-7]|C11[0-5])$)|(^2([A-C][GD]|D|DD)([0-3]|[GD])([12]|[GD])(0[0-6]|[1-4][12]|)$)|(^3E?(([GD][0-3]|C[1-3])(0[1-9]|10)|C00[1-8])(A|B)?$)|(^4([AB]|C[A-E]|[D-H])[0-9]{3}$)|(^5A[0-9]{3}(-[0-9])?$)|(^6([AD][AB]|BA|CA)[1-5]0[1-6]$)|(PAS SUR LE CAMPUS)/.test(room) === false) {
            this.setState({roomError: true});
        }

        if (this.state.roomError === false) {
            axios({
                method: 'put',
                url: `${config.back_Url}/users/${this.props.profile.id}`,
                headers: {Token: localStorage.getItem('killerToken')},
                data: {
                    pseudo,
                    room,
                    admin,
                    alive,
                    afk,
                    phone,
                    afkScore,
                    experience,
                    school
                },
            }).then((data) => {
                if (data.status === 200) {
                    this.makeFeedback(
                        'positive',
                        'ok',
                    );
                    this.setState({roomError: false});
                    const up = data.data;
                    this.props.updateState(up);
                } else {
                    this.makeFeedback(
                        'negative',
                        'erreur du cul',
                    );
                }
            });
        }
    }


    handleDelete = () => {
        axios({
            method: 'delete',
            url: `${config.back_Url}/users/${this.props.profile.id}`,
            headers: {Token: localStorage.getItem('killerToken')},
        }).then((data) => {
            if (data.data.status === 200) {
                window.location.assign('/');
            } else {
                this.makeFeedback(
                    'negative',
                    'erreur du cul',
                );
            }
        });
    }

    handleCheckbox = (prop) => {
        this.setState((prevState) => ({
            [prop]: !prevState[prop],
        }));
    }

    handleChange = (event) => {
        const {target} = event;
        const {value} = target;
        const {name} = target;

        this.setState({roomError: false})
        this.setState({
            [name]: value,
        });
    }

    handleChangeDrop = (e, {name, value}) => {
        this.setState({[name]: value});
    }

    componentDidMount = () => {
        this.setState({
            pseudo: this.props.profile.pseudo,
            room: this.props.profile.room,
            admin: this.props.profile.admin,
            alive: this.props.profile.alive,
            afk: this.props.profile.afk,
            afkScore: this.props.profile.afkScore,
            teamId: this.props.profile.teamId,
            phone: this.props.profile.phone,
            userSkills: this.props.profile.userSkills,
            userAchievements: this.props.profile.userAchievements,
            experience: this.props.profile.experience,
            school: this.props.profile.school
        });
        this.getAllSkills();
        this.getAllAchievements();

    }

    handleRezUser = () => {
        const {alive} = this.state;

        if (!alive) {
            axios({
                method: 'post',
                url: `${config.back_Url}/users/${this.props.profile.id}/rez`,
                headers: {Token: localStorage.getItem('killerToken')},
            }).then((response) => {
                if (response.data.status === 200) {
                    this.props.updateState(response.data.object);
                    this.makeFeedback(
                        'positive',
                        'ok',
                    );
                } else {
                    this.makeFeedback(
                        'negative',
                        'erreur du cul',
                    );
                }
            });
        }
    }

    handleFreeRezUser = () => {
        const {alive} = this.state;

        if (!alive) {
            axios({
                method: 'post',
                url: `${config.back_Url}/users/${this.props.profile.id}/freerez`,
                headers: {Token: localStorage.getItem('killerToken')},
            }).then((response) => {
                if (response.data.status === 200) {
                    this.props.updateState(response.data.object);
                    this.makeFeedback(
                        'positive',
                        'ok',
                    );
                } else {
                    this.makeFeedback(
                        'negative',
                        'erreur du cul',
                    );
                }
            });
        }
    }


    handleChangeRadio = (e, {value}) => this.setState({admin: value})

    giveTime = () => {
        const message = ((new Date()).getUTCHours() + 2).toString() + ' ' + ((new Date()).getUTCMinutes()).toString() + ' ' + ((new Date()).getUTCSeconds()).toString();
        this.makeFeedback('positive', message)
    }

    getAllSkills = () => {
        axios({
            method: 'get',
            url: `${config.back_Url}/skills/`,
            headers: {Token: localStorage.getItem('killerToken')},
        }).then((result) => {

            axios({
                method: 'get',
                url: `${config.back_Url}/teams/${this.state.teamId}`,
                headers: {Token: localStorage.getItem('killerToken')},
            }).then(
                (team) => {
                    const teamSkills = team.data.object.linkTeamSkills.map(teamSkill => teamSkill.name)
                    axios({
                        method: 'get',
                        url: `${config.back_Url}/teams/${this.state.teamId}/users/`,
                        headers: {Token: localStorage.getItem('killerToken')},
                    }).then(teamUsers => {
                        const teamUsersSkills = teamUsers.data.object.map(data => data.userSkills.map(userSkill => userSkill.name))
                        result.data.object.map((s) => {
                            console.log(teamUsersSkills.filter((array) => array.includes(s.name)).length === 0)
                            s.price = s.baseCost - 5 * this.state.userSkills.filter((skill) => skill.type.includes(s.type[0]) && skill.level < s.level).length
                            if (s.type.length === 2) s.price = s.price - 5 * this.state.userSkills.filter((skill) => skill.type.includes(s.type[1]) && skill.level < s.level).length
                            if (teamSkills.includes("Spécialisation") && teamUsersSkills.filter((array) => array.includes(s.name)).length >= Math.floor(teamUsersSkills.length * 2 / 3)) s.price = s.price - 5
                            if (teamSkills.includes("Diversification") && teamUsersSkills.filter((array) => array.includes(s.name)).length === 0) s.price = s.price - 5
                            if (s.price < 0) s.price = 0
                            s.skillId = s.id
                        })
                        this.setState({allSkills: result.data.object})
                    })
                }
            )
        });
    }

    getAllAchievements = () => {
        axios({
            method: 'get',
            url: `${config.back_Url}/achievements/`,
            headers: {Token: localStorage.getItem('killerToken')},
        }).then((result) => {
            result.data.object.map((a) => {
                a.achievementId = a.id
            })
            this.setState({allAchievements: result.data.object});

        });
    }

    isGivable = (achievement) => {
        const isGivable = this.state.userAchievements.map((a) => {
                if (a.achievementId === achievement.id) {
                    return false
                }
            }
        )
        return !(isGivable.includes(false))
    }

    isBuyable = (skill) => {
        const isBuyable = this.state.userSkills.map((s) => {
                if (s.skillId === skill.id) {
                    return false
                }
            }
        )
        return !(isBuyable.includes(false) || (skill.level > 1 && this.state.userSkills.filter((s) => s.level === skill.level - 1).length < 2));
    }

    buySkill = (skill) => {
        axios.post(`${config.back_Url}/skills/${this.props.profile.id}`,
            {
                skillId: skill.skillId,
                price: skill.price,
                experience: this.state.experience,
                isWeapon: skill.isWeapon
            }, {
                headers: {Token: localStorage.getItem('killerToken')}
            }
        ).then(async r => {
            if (r.data.status !== 200) this.makeFeedback(
                'negative',
                r.data.message,
            );
            else {
                const skillBought = {
                    description: skill.description,
                    isWeapon: skill.isWeapon,
                    level: skill.level,
                    name: skill.name,
                    skillId: skill.skillId,
                    type: skill.type,
                    price: skill.price
                }

                this.props.updateState({experience: this.state.experience - skill.price})

                this.setState({
                    experience: this.state.experience - skill.price
                })

                this.state.userSkills.push(skillBought)

                await this.getAllSkills()

                this.makeFeedback(
                    'positive',
                    "compétence mise a jour avec succés",
                );
            }
        }).catch(e => {
                this.makeFeedback(
                    'negative',
                    e.message,
                );
            }
        )
    }

    sellSkill = (skill) => {
        axios.post(`${config.back_Url}/skills/delete/${this.props.profile.id}`,
            {
                skillId: skill.skillId,
                price: skill.price,
                experience: this.state.experience
            }, {
                headers: {Token: localStorage.getItem('killerToken')}
            }
        ).then(async r => {
            this.props.updateState({experience: this.state.experience + skill.price})

            const skillToRemove = this.state.userSkills.find((s) => s.skillId === skill.skillId)

            this.setState({
                userSkills: this.state.userSkills.filter((s) => s !== skillToRemove),
                experience: this.state.experience + skill.price
            })

            await this.getAllSkills()

            this.makeFeedback(
                'positive',
                r.data.message,
            );
        }).catch(e => {

                this.makeFeedback(
                    'negative',
                    e.message,
                );
            }
        )
    }

    giveAchievement = (achievement) => {
        axios.post(`${config.back_Url}/achievements/${this.props.profile.id}`,
            {
                achievementId: achievement.achievementId,
                name: achievement.name,
            }, {
                headers: {Token: localStorage.getItem('killerToken')}
            }
        ).then(async r => {
            if (r.data.status !== 200) this.makeFeedback(
                'negative',
                r.data.message,
            );
            else {
                const achievementGived = {
                    description: achievement.description,
                    name: achievement.name,
                    achievementId: achievement.achievementId,

                }


                this.state.userAchievements.push(achievementGived);

                await this.getAllAchievements()


            }
        }).catch(e => {
                this.makeFeedback(
                    'negative',
                    e.message,
                );
            }
        )


    }

    deleteAchievement = (achievement) => {
        axios.post(`${config.back_Url}/achievements/delete/${this.props.profile.id}`,
            {
                achievementId: achievement.achievementId,
                name: achievement.name,
            }, {
                headers: {Token: localStorage.getItem('killerToken')}
            }
        ).then(async r => {

            const achievementToRemove = this.state.userAchievements.find((a) => a.achievementId === achievement.achievementId)

            this.setState({
                userAchievements: this.state.userAchievements.filter((a) => a !== achievementToRemove),
            })

            await this.getAllAchievements()

            this.makeFeedback(
                'positive',
                r.data.message,
            );
        }).catch(e => {

                this.makeFeedback(
                    'negative',
                    e.message,
                );
            }
        )
    }

    render() {
        const {
            pseudo,
            room,
            alive,
            admin,
            afk,
            afkScore,
            roomError,
            teamId,
            message,
            variant,
            open,
            phone,
            experience,
            allSkills,
            school,
            userAchievements,
            allAchievements,
        } = this.state;
        return (
            <div>
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
                <div>
                    <Divider/>
                    <h2>Compétences</h2>
                    <Table celled padded sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nom</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell>Types</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Prix</Table.HeaderCell>
                                <Table.HeaderCell>Vendre</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.userSkills.map((skill, key) => (
                                <Table.Row key={key}>
                                    <Table.Cell textAlign="center">
                                        <h5>{skill.name}</h5>
                                    </Table.Cell>
                                    <Table.Cell>{skill.level}</Table.Cell>
                                    <Table.Cell>{skill.type.join(', ')}</Table.Cell>
                                    <Table.Cell>{skill.description}</Table.Cell>
                                    <Table.Cell>{skill.price}</Table.Cell>
                                    <Table.Cell><Button style={{marginLeft: '2em'}}
                                                        onClick={() => this.sellSkill(skill)} negative>
                                        Vendre
                                    </Button>{(skill.isWeapon && this.state.userSkills.filter(s => s.skillId === skill.skillId).length < 2) ?
                                        <Button style={{marginLeft: '2em'}}
                                                onClick={() => this.buySkill(skill)} positive>
                                            Acheter
                                        </Button> : <div/>}</Table.Cell>

                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <Header as="h2">Acheter une compétence</Header>
                {this.state.showSkills ? <Button onClick={() => {
                    this.setState({showSkills: false});
                }}>masquer les compétences restantes</Button> : <Button onClick={() => {
                    this.setState({showSkills: true});
                }}>voir les compétences restantes</Button>}
                {this.state.showSkills ? <div>
                    <Divider/>
                    <Table celled padded sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nom</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell>Types</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Prix</Table.HeaderCell>
                                <Table.HeaderCell>Acheter</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {allSkills.map((skill, key) => {
                                    if (this.isBuyable(skill) !== false) {
                                        return (<Table.Row key={key}>
                                            <Table.Cell textAlign="center">
                                                <h5>{skill.name}</h5>
                                            </Table.Cell>
                                            <Table.Cell>{skill.level}</Table.Cell>
                                            <Table.Cell>{skill.type.join(', ')}</Table.Cell>
                                            <Table.Cell>{skill.description}</Table.Cell>
                                            <Table.Cell>{skill.price}</Table.Cell>
                                            <Table.Cell><Button style={{marginLeft: '2em'}}
                                                                onClick={() => this.buySkill(skill)} positive>
                                                Acheter
                                            </Button></Table.Cell>
                                        </Table.Row>)
                                    }
                                }
                            )}
                        </Table.Body>
                    </Table>
                </div> : <div/>}

                <Header as="h2">Mes Achievements</Header>
                <div>
                    <Divider/>
                    <Table celled padded sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nom</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Donner</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {userAchievements.map((achievement, key) => {

                                    return (<Table.Row key={key}>
                                        <Table.Cell textAlign="center">
                                            <h5>{achievement.name}</h5>
                                        </Table.Cell>
                                        <Table.Cell>{achievement.description}</Table.Cell>
                                        <Table.Cell><Button style={{marginLeft: '2em'}}
                                                            onClick={() => this.deleteAchievement(achievement)} negative>
                                            Enlever
                                        </Button></Table.Cell>
                                    </Table.Row>)
                                }
                            )}
                        </Table.Body>
                    </Table>
                </div>

                <Header as="h2">Donner un Achievement</Header>
                {this.state.showAchievements ? <Button onClick={() => {
                    this.setState({showAchievements: false});
                }}>masquer les achievements restants</Button> : <Button onClick={() => {
                    this.setState({showAchievements: true});
                }}>voir les achievements restants</Button>}
                {this.state.showAchievements ? <div>
                    <Divider/>
                    <Table celled padded sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nom</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Donner</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {allAchievements.map((achievement, key) => {
                                    if (!userAchievements.map(ua => ua.name).includes(achievement.name))
                                        return (<Table.Row key={key}>
                                            <Table.Cell textAlign="center">
                                                <h5>{achievement.name}</h5>
                                            </Table.Cell>
                                            <Table.Cell>{achievement.description}</Table.Cell>
                                            <Table.Cell><Button style={{marginLeft: '2em'}}
                                                                onClick={() => this.giveAchievement(achievement)} positive>
                                                Donner
                                            </Button></Table.Cell>
                                        </Table.Row>)
                                }
                            )}
                        </Table.Body>
                    </Table>
                </div> : <div/>}

                <Header as="h2">Gestion</Header>
                <Button type="button" onClick={() => this.setState({showModal: true})}>
                    <Icon name="photo"/>
                    Uploader une photo
                </Button>
                <Button onClick={this.handleDelete} negative>Supprimer le joueur</Button>
                <Button positive type="button" onClick={this.handleRezUser} disabled={alive || teamId === null}>
                    <Icon name="ambulance"/>
                    Résurrectionner le joueur
                </Button>
                <Button positive type="button" onClick={this.handleFreeRezUser} disabled={alive || teamId === null}>
                    <Icon name="ambulance"/>
                    Résurrectionner le joueur gratuitement
                </Button>
                <ImageUploader uploadUrl={`/users/${this.props.profile.id}`} type="user" open={this.state.showModal}
                               handleSubmit={this.handleSubmitPicture}/>
                <div className="spacing"/>

                <Form>
                    <Form.Input label="Pseudo" name="pseudo" value={pseudo} onChange={this.handleChange}/>
                    <Form.Input label="Room" name="room" value={room} onChange={this.handleChange}
                                error={roomError ? {content: "Les règles s'appliquent aussi à toi petit con"} : false}/>
                    <Form.Input label="phone" name="phone" value={phone} onChange={this.handleChange}/>
                    <Form.Input label="Electif/ST/mention/Césure" name="school" value={school}
                                onChange={this.handleChange}/>
                    <Form.Checkbox label="Alive" name="alive" checked={alive}
                                   onChange={() => this.handleCheckbox('alive')}/>
                    <label>status</label>
                    <Form.Radio
                        label="Joueur"
                        value="JOUEUR"
                        checked={admin === 'JOUEUR'}
                        onChange={this.handleChangeRadio}
                    />
                    <Form.Radio
                        label="Admin"
                        value="ADMIN"
                        checked={admin === 'ADMIN'}
                        onChange={this.handleChangeRadio}
                    />
                    <Form.Radio
                        label="Super Admin"
                        value="SUPERADMIN"
                        checked={admin === 'SUPERADMIN'}
                        onChange={this.handleChangeRadio}
                    />
                    <Form.Checkbox label="Afk" name="afk" checked={afk} onChange={() => this.handleCheckbox('afk')}/>
                    <Form.Input label="Afk score" name="afkScore" type="number" value={afkScore}
                                onChange={this.handleChange}/>
                    <Form.Input label="experience" name="experience" type="number" value={experience}
                                onChange={this.handleChange}/>
                    <Button type="submit" onClick={this.handleSubmit}>Valider</Button>
                </Form>
            </div>
        );
    }
}

export default UserGestion;
