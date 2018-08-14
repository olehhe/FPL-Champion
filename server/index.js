var express = require('express');
var app = express();
var api = require('./api');
var err = require('./middleware/err');
var logger = require('./utils/logger');

// Setup middleware
require('./middleware/appMiddleware')(app);

// Setup API-route
logger.log('Set API route');
app.use('/api', api);

// Setup global error handling
app.use(err());

module.exports = app;