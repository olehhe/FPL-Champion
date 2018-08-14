var router = require('express').Router();
var mongoose = require('mongoose');
var logger = require('../utils/logger');

// Db connection
const DB_CONSTRING_TEST = 'mongodb://localhost:27017/fplAPI_test';
const DB_CONSTRING = 'mongodb://localhost:27017/fplAPI';
var db;
if (process.env.ENV == 'Test')
    var db = mongoose.connect(DB_CONSTRING_TEST, { useNewUrlParser: true });
else
    var db = mongoose.connect(DB_CONSTRING, { useNewUrlParser: true });

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