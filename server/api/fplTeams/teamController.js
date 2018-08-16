"use strict";
const logger = require("../../utils/logger");
const teamController = (Team) => {
    const _allowedQueryParams = [
        'name',
        'short_name'
    ];
    const get = (req, res) => {
        let query = {};
        _allowedQueryParams.forEach((p) => {
            if (req.query[p]) {
                query[p] = new RegExp(req.query[p], 'i');
            }
        });
        Team.find(query, (err, teams) => {
            if (err) {
                logger.log(err);
                res.status(500);
                res.send(err);
            }
            else {
                let returnTeams = [];
                teams.forEach((item) => {
                    var team = item.toJSON();
                    team.links = {};
                    team.links.self = 'http://' + req.headers.host + '/api/teams/' + encodeURIComponent(team.code);
                    returnTeams.push(team);
                });
                logger.log('Returning data with OK 200');
                res.status(200);
                res.json(returnTeams);
            }
        });
    };
    const getWithTeamCode = (req, res) => {
        res.json(req.team);
    };
    return {
        get: get,
        getWithTeamCode: getWithTeamCode
    };
};
module.exports = teamController;
