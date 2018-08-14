// Setup config
var config = require('./server/config/config');

// Init server
var app = require('./server');

// Logging
var logger = require('./server/utils/logger')

app.listen(config.port);
logger.log('Server listening on port ' + config.port);