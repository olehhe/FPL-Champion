var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

/* Constants */
const FALLBACK_PORT = 3000;
const DB_CONSTRING_TEST = 'mongodb://localhost:27017/fplAPI_test';
const DB_CONSTRING = 'mongodb://localhost:27017/fplAPI';

/* App */
var app = express();
var port = process.env.PORT || FALLBACK_PORT;

/* DB */
var db;
if (process.env.ENV == 'Test')
    var db = mongoose.connect(DB_CONSTRING_TEST, { useNewUrlParser: true });
else
    var db = mongoose.connect(DB_CONSTRING, { useNewUrlParser: true });

/* Global middleware */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Models */
var playerModel = require('./Models/playerModel');
var teamModel = require('./Models/teamModel');
var gameweekModel = require('./Models/gameweekModel');
var userModel = require('./Models/userModel');

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
var userRouter = require('./Routes/userRoutes')(userModel);

app.use('/api/players', playerRouter);
app.use('/api/teams', teamRouter);
app.use('/api/gameweeks', gameweekRouter);
app.use('/api/users', userRouter);

/* Error handler */
app.use((err, req, res, next) => {
    if (err) {
        console.err('An error occurred: ' + err.message);
        res.status(500);
        res.send('Oops! Something has gone wrong on our side, how embarassing... We\'ll try and fix it ASAP!');
    }
});

/* Listeners */
app.listen(port, () => {
    console.log('API running on port ' + port);
});

/* Export */
module.exports = app;