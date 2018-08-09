"use strict";
const express = require("express");
const teamModel_1 = require("../Models/teamModel");
const teamController_1 = require("../Controllers/teamController");
const teamRouter = express.Router();
const teamCtrl = new teamController_1.teamController();
const routes = () => {
    teamRouter.use('/:teamCode', (req, res, next) => {
        teamModel_1.Team.findOne({ 'code': req.params.teamCode }, (err, team) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else if (team) {
                console.log("INSODE Middleware");
                req.team = team;
                next();
            }
            else {
                res.status(404);
                res.send('No team found');
            }
        });
    });
    teamRouter.route('/')
        .get(teamCtrl.get);
    teamRouter.route('/:teamCode')
        .get(teamCtrl.getWithTeamCode);
    return teamRouter;
};
module.exports = routes;
