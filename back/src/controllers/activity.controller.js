const fs = require('fs');
const {
    activity,
    user,
    kill,
    enigma,
    hint,
    enigmaTeam,
    hintTeam,
    items,
    teamItems,
    linkTeamSkills,
    teamSkills, userAchievements, achievements, teamAchievements, userSkills, skills,
} = require('../models/db');
const {upload, monitor, stringify} = require('./utils');
const path = require("path");

const {
    parseUsers,
} = require('./user.controller');

const rawData = fs.readFileSync('./settings.json');
const settings = JSON.parse(rawData);

function parseActivity(act, right) {
    const rawDataLoc = fs.readFileSync('./settings.json');
    const settingsLoc = JSON.parse(rawDataLoc);
    const ret = act.dataValues;
    const Prom = [];
    return Promise.all(Prom).then(() => ret);
}


// function getScore(id) {
//     let score = 0;
//     return kill.findAll(
//         {
//             include: [
//                 {
//                     model: user,
//                     as: 'killerUser',
//                     where: {
//                         teamId: id,
//                     },
//                 }],
//         },
//     ).then((data) => {
//         data.forEach((kil) => {
//             score += kil.score;
//         });
//         return enigma.findAll({
//             include: [{
//                 model: enigmaTeam,
//                 where: {
//                     teamId: id,
//                     resolved: true,
//                 },
//             }],
//         }).then((dataEnigma) => {
//             dataEnigma.forEach((enig) => {
//                 score += enig.score;
//             });
//             return user.findAll({
//                 include: [
//                     {
//                         model: userAchievements,
//                         include: [{model: achievements}]
//                     }],
//                 where: {
//                     teamId: id,
//                 }
//             }).then((dataAchievements) => {
//                 dataAchievements.forEach(
//                     (userAchievement) => userAchievement.dataValues.userAchievements.forEach(
//                         (achievement) => score += achievement.dataValues.achievement.dataValues.points
//                     )
//                 )
//                 return teamAchievements.findAll({
//                     include: [
//                         {
//                             model: achievements,
//                         }],
//                     where: {
//                         teamId: id,
//                     }
//                 }).then(teamAchievement => {
//                     teamAchievement.forEach((ta) => score += ta.dataValues.achievement.dataValues.points)
//                     return score
//                 })
//             })
//         })
//     });
// }

function adminRightTeam(req, res) {
    return user.findOne({where: {username: req.user.login}}).then((data) => {
        if (data === null) {
            // res is defined ?
            res.end('user not found');
        } else {
            return team.findOne({where: {id: req.params.id}}).then((dataTeam) => {
                if (dataTeam === null) {
                    res.end('team not found');
                } else {
                    if (data.dataValues.admin === 'ADMIN' || data.dataValues.admin === 'SUPERADMIN' || dataTeam.dataValues.leader === data.dataValues.username) {
                        return dataTeam;
                    }

                    return null;
                }
            });
        }
    });
}

function getActivities(req, res) {
    const rawDataLoc = fs.readFileSync('./settings.json');
    const settingsLoc = JSON.parse(rawDataLoc);
    if (!('limit' in req.query)) {
        req.query.limit = 10;
    }
    if (!('offset' in req.query)) {
        req.query.offset = 0;
    }

    const exclude = [];
    // if (req.right === 'JOUEUR') {
    //     exclude.push('money');
    // }
    activity.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        attributes: {exclude},
    }).then(async (datas) => {
        const dataActivity = [];
        Promise.all(datas.map(async (data) => {
            // if (req.right === 'JOUEUR' && !settingsLoc.SCORE_VISIBLE) {
            //     data.score = 'PERDU';
            // } else {
            //     data.score += await getScore(data.id);
            // }
            dataActivity.push(data);

        })).then(() => {
            res.send({
                status: 200,
                object: dataActivity,
                message: 'Liste des activites',
            });
        });
    });
}

function postTeam(req, res) {
    user.findOne({where: {username: req.user.login}}).then((data) => {
        if (data === null) {
            res.send({
                status: 400,
                object: null,
                message: 'User not found',
            });
        } else if (data.dataValues.teamId !== null) {
            res.send({
                status: 400,
                object: data.dataValues.teamId,
                message: 'Already in a team',
            });
        } else {
            req.body.leader = req.user.login;
            req.body.money = settings.MONEY_INITIAL;
            team.create(req.body).then((dataTeam) => {
                data.update({teamId: dataTeam.id});
                res.send({
                    status: 201,
                    object: dataTeam,
                    message: "Création de l'équipe",
                });
                enigma.findAll({}).then((dataEnigma) => {
                    dataEnigma.map((enig) => enigmaTeam.create({
                        teamId: dataTeam.dataValues.id,
                        enigmaId: enig.id,
                    }));
                });
                hint.findAll({}).then((dataHint) => {
                    dataHint.map((hin) => hintTeam.create({
                        teamId: dataTeam.dataValues.id,
                        hintId: hin.id,
                    }));
                });
                monitor(`Équipe créée \n\n${stringify(dataTeam.dataValues, ['name', 'faction', 'leader'])}`);
            });
        }
    });
}

function getTeam(req, res) {
    let exclude = [];
    const rawDataLoc = fs.readFileSync('./settings.json');
    const settingsLoc = JSON.parse(rawDataLoc);

    if (req.right === 'JOUEUR' && req.teamId !== parseInt(req.params.id, 10)) {
        exclude.push('money');
    }
    team.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: teamItems,
                include: [
                    {model: items}
                ]
            },
            {
                model: linkTeamSkills,
                include: [
                    {model: teamSkills}
                ]
            },
            {
                model: teamAchievements,
                include: [
                    {model: achievements}
                ]
            }
        ]
    }).then((data) => {
        parseTeam(data, req.right).then(async (data) => {
            if (req.right === 'JOUEUR' && !settingsLoc.SCORE_VISIBLE) {
                data.score = 'PERDU';
            } else {
                data.score += await getScore(data.id);
            }

            res.send({
                status: 200,
                object: data,
                message: 'Liste des équipes',
            });
        });
    })

}

function putTeam(req, res) {
    team.findOne({where: {id: req.params.id}}).then(async (data) => {
        if (data === null) {
            res.send({
                status: 400,
                object: null,
                message: 'Aucune équipe a été trouvée',
            });
        } else {
            const score = await getScore(data.dataValues.id);

            const before = stringify(data.dataValues, Object.keys(req.body));
            const oldPicture = data.dataValues.picture !== null ? data.dataValues.picture.split('/')[data.dataValues.picture.split('/').length - 1] : "";

            if (req.body.score !== undefined) {
                req.body.score -= score;
            }

            if (req.file !== undefined) {
                const tmp = upload(req.file);
                if (tmp !== null) {
                    req.body.picture = tmp;
                    fs.unlink(path.join('static/' + oldPicture), () => data.update(req.body).then((dataEdit) => {
                        dataEdit.dataValues.score += score;
                        dataEdit.dataValues.faction = req.body.faction;
                        res.send({
                            status: 200,
                            object: dataEdit,
                            message: "Modification de l'équipe",
                        });
                        monitor(`Équipe modifiée ${dataEdit.dataValues.name}\n\nAvant:\n${before}\n\nAprès:\n${stringify(req.body, Object.keys(req.body))}\n\nOrchestré par ${req.user.login}`);

                    }));
                }
            } else {
                data.update(req.body).then((dataEdit) => {
                    dataEdit.dataValues.score += score;
                    dataEdit.dataValues.faction = req.body.faction;
                    res.send({
                        status: 200,
                        object: dataEdit,
                        message: "Modification de l'équipe",
                    });
                    monitor(`Équipe modifiée ${dataEdit.dataValues.name}\n\nAvant:\n${before}\n\nAprès:\n${stringify(req.body, Object.keys(req.body))}\n\nOrchestré par ${req.user.login}`);

                })
            }
        }
    });
}

function delTeam(req, res) {
    adminRightTeam(req).then((data) => {
        if (data !== null) {
            const picture = data.dataValues.picture.split('/')[data.dataValues.picture.split('/').length - 1]

            fs.unlink(path.join('static/' + picture), () => {
                data.destroy().then(() => {
                    res.send({
                        status: 200,
                        object: true,
                        message: "Supression de l'équipe",
                    });
                    monitor(`Équipe supprimée \n\n${stringify(data.dataValues, ['name', 'faction', 'leader', 'score'])}`);
                });
            })
        } else {
            res.send({
                status: 400,
                object: false,
                message: "Erreur lors de la suppression de l'équipe",
            });
        }
    });
}

function addUser(req, res) {
    adminRightTeam(req).then((right) => {
        if (right) {
            user.findOne({where: {username: req.body.username}}).then((dataUser) => {
                if (dataUser === null) {
                    res.end({
                        status: 400,
                        object: null,
                        message: 'User not found',
                    });
                } else if (dataUser.dataValues.teamId !== null) {
                    res.send({
                        status: 400,
                        object: null,
                        message: 'User already in a team',
                    });
                } else {
                    user.count({where: {teamId: req.params.id}}).then((nbUser) => {
                        if (nbUser >= settings.MAX_USER_TEAM) {
                            res.send({
                                status: 400,
                                object: null,
                                message: 'Too many user in a team',
                            });
                        } else if (dataUser.dataValues.admin !== 'JOUEUR' && req.right === 'JOUEUR') {
                            res.send({
                                status: 400,
                                message: 'vous ne pouvez pas ajouter un non-joueur à votre équipe',
                                object: null,
                            });
                        } else {
                            dataUser.update({teamId: parseInt(req.params.id, 10)}).then((dataSend) => {
                                res.send({
                                    status: 201,
                                    object: dataSend,
                                    message: "Ajout de l'utilisateur à l'équipe",
                                });
                            });
                        }
                    });
                }
            });
        } else {
            res.end('Unauthorized');
        }
    });
}

function delUser(req, res) {
    adminRightTeam(req).then((right) => {
        if (right) {
            user.findOne({where: {username: req.body.username}}).then((dataUser) => {
                if (dataUser === null) {
                    res.end('user not found');
                } else if (dataUser.dataValues.teamId !== parseInt(req.params.id, 10)) {
                    res.end('user not in the team');
                } else {
                    team.findOne({where: {id: req.params.id}}).then((dataTeam) => {
                        if (dataTeam.dataValues.leader === req.body.username) {
                            res.end('The leader cannot flee');
                        } else {
                            dataUser.update({teamId: null}).then(() => {
                                res.send({
                                    status: 200,
                                    object: true,
                                    message: 'User removed from team',
                                });
                            });
                        }
                    });
                }
            });
        } else if (req.user.username === req.body.username) {
            user.findOne({where: {username: req.body.username}}).then((dataUser) => {
                if (dataUser === null) {
                    res.send({
                        status: 400,
                        object: null,
                        message: 'User not found',
                    });
                } else if (dataUser.dataValues.teamId !== req.params.id) {
                    res.send({
                        status: 400,
                        object: null,
                        message: 'User not in the team',
                    });
                } else {
                    dataUser.update({teamId: null}).then(() => {
                        res.send({
                            status: 200,
                            object: true,
                            message: "Suppression de l'utilisateur",
                        });
                    });
                }
            });
        } else {
            res.end('Unauthorized');
        }
    });
}

function getUsers(req, res) {
    user.findAll({
        where: {
            teamId: req.params.id,
        },
        include: {model: userSkills, include: {model: skills}}
    }).then((data) => {
        parseUsers(data, req.right).then((ret) => {
            res.send({
                status: 200,
                object: ret,
                message: 'Liste des utilisateurs de la team',
            });
        });
    });
}

module.exports = {
    // postTeam,
    getActivities,
    // getTeam,
    // getUsers,
    // putTeam,
    // delTeam,
    // addUser,
    // delUser,
    // getScore,
};
