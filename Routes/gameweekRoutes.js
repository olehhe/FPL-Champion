var express = require('express');

var routes = (Gameweek) => {
    var gameweekRouter = express.Router();
    var gameweekController = require('../Controllers/gameweekController')(Gameweek);

    /* Middleware */
    gameweekRouter.use('/:gameweekNumber', (req, res, next) => {
        Gameweek.findOne({ 'id': req.params.gameweekNumber }, (err, gameweek) => {
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

    return gameweekRouter;
}

module.exports = routes;