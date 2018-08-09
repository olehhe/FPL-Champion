"use strict";
const express = require("express");
const teamController_1 = require("../Controllers/teamController");
const teamRouter = express.Router();
const teamCtrl = new teamController_1.teamController();
const routes = () => {
    teamRouter.route('/').get(teamCtrl.get);
    teamRouter.route('/:teamCode').get(teamCtrl.getWithTeamCode);
    return teamRouter;
};
module.exports = routes;
