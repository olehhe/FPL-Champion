var express = require('express');

var routes = (Player) => {
    var playerRouter = express.Router();
    var playerController = require('../Controllers/playerController')(Player);

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

    return playerRouter;
};

module.exports = routes;