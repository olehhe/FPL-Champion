var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/* App */
var app = express();
var port = process.env.PORT || 3000;

/* DB */
var db;
if (process.env.ENV == 'Test')
    var db = mongoose.connect('mongodb://localhost:27017/fplAPI_test', { useNewUrlParser: true });
else
    var db = mongoose.connect('mongodb://localhost:27017/fplAPI', { useNewUrlParser: true });

/* Parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Models */
var playerModel = require('./Models/playerModel');
var teamModel = require('./Models/teamModel');
var gameweekModel = require('./Models/gameweekModel');

/* Routes */
app.get('/', (req, res) => {
    res.json({
        What: 'Fantasy Premier League API',
        Why: 'For fun',
        When: 'The start of 18/19-season',
        Who: 'Ole Henrik Hellenes & Jo Krokengen'
    });
});

var playerRouter = require('./Routes/playerRoutes')(playerModel);
var teamRouter = require('./Routes/teamRoutes')(teamModel);
var gameweekRouter = require('./Routes/gameweekRoutes')(gameweekModel);

app.use('/api/players', playerRouter);
app.use('/api/teams', teamRouter);
app.use('/api/gameweeks', gameweekRouter);

/* Listeners */
app.listen(port, () => {
    console.log('API running on port ' + port);
});

/* Export */
module.exports = app;