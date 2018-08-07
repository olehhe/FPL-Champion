var express = require('express');

var routes = (Team) => {
    var teamRouter = express.Router();
    var teamController = require('../Controllers/teamController')(Team);

    /* Middleware */
    teamRouter.use('/:teamCode', (req, res, next) => {
        Team.findOne({ 'code': req.params.teamCode }, (err, team) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else if (team) {
                req.team = team;
                next();
            }
            else {
                res.status(404);
                res.send('No team found');
            }
        });
    });

    /* Routes */
    teamRouter.route('/')
        .get(teamController.get);

    teamRouter.route('/:teamCode')
        .get(teamController.getWithTeamCode);

    return teamRouter;
};

module.exports = routes;