var playerRouter =  require('express').Router();
var Player = require('./playerModel');
var playerController = require('./playerController')(Player);

/* Middleware */
playerRouter.param('playerId', (req, res, next, playerId) => {
    Player.findById(playerId, (err, player) => {
        if (err) {
            res.status(500);
            res.send(err);
        }
        else if (player) {
            req.player = player;
            next();
        }
        else {
            res.status(404);
            res.send('No player found');
        }
    });
})

/* Routes */
playerRouter.route('/')
    .get(playerController.get);

playerRouter.route('/:playerId')
    .get(playerController.getWithId);


module.exports = playerRouter;