var router = require('express').Router();
var logger = require('../utils/logger');

// Routers
var fplGameweeksRouter = require('./fplGameweeks/gameweeksRoutes');
var fplPlayersRouter = require('./fplPlayers/playersRoutes');
var fplTeamsRouter = require('./fplTeams/teamsRoutes');
var usersRouter = require('./users/usersRoutes');

// Routes
logger.log('Set api sub-routes');
router.use('/gameweeks', fplGameweeksRouter);
router.use('/players', fplPlayersRouter);
router.use('/teams', fplTeamsRouter);
router.use('/users', usersRouter);

module.exports = router;