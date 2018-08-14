var gameweekRouter = require('express').Router();
var Gameweek = require('./gameweekModel');
var gameweekController = require('./gameweekController')(Gameweek);

/* Middleware */
gameweekRouter.param('gameweekNumber', (req, res, next, gameweekNumber) => {
    Gameweek.findOne({ 'id': gameweekNumber }, (err, gameweek) => {
        if (err) {
            res.status(500);
            res.send(err);
        }
        else if (gameweek) {
            req.gameweek = gameweek;
            next();
        }
        else {
            res.status(404);
            res.send('Gameweek not found');
        }
    });
});

/* Routes */
gameweekRouter.route('/')
    .get(gameweekController.get);

gameweekRouter.route('/:gameweekNumber')
    .get(gameweekController.getByWeekNumber);


module.exports = gameweekRouter;