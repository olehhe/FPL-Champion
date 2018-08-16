var config = require('../config/config');
var router = require('express').Router();
var mongoose = require('mongoose');
var logger = require('../utils/logger');

// Db connection
var db;
if (process.env.ENV == 'Test')
    mongoose.connect(config.db.DB_CONSTRING_TEST, { useNewUrlParser: true });
else
    mongoose.connect(config.db.DB_CONSTRING, { useNewUrlParser: true });

// Routers
var fplGameweeksRouter = require('./fplGameweeks/gameweeksRoutes');
var fplPlayersRouter = require('./fplPlayers/playersRoutes');
var fplTeamsRouter = require('./fplTeams/teamsRoutes');
var usersRouter = require('./users/usersRoutes');

// Routes
router.use('/', (req, res) => {
    res.json({
        title: 'FPL Champion API',
        descr: 'Meh',
        author: 'OHH&JLK'
    });
});

logger.log('Set api sub-routes');
router.use('/gameweeks', fplGameweeksRouter);
router.use('/players', fplPlayersRouter);
router.use('/teams', fplTeamsRouter);
router.use('/users', usersRouter);

module.exports = router;