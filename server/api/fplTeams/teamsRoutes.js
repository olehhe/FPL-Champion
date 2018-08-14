var teamRouter = require('express').Router();
var Team = require('./teamModel');
var teamController = require('./teamController')(Team);

/* Middleware */
teamRouter.param('teamCode', (req, res, next, teamCode) => {
    Team.findOne({ 'code': teamCode }, (err, team) => {
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


module.exports = teamRouter;