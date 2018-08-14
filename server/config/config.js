var _ = require('lodash');

var config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    logging: false,
    db: {
        DB_CONSTRING_TEST: '',
        DB_CONSTRING: ''
    }
};

// Check if NODE_ENV exists. If not, set to development
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

// Environment-specific config
var envConfig;
try {
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
} catch (e) {
    envConfig = {};
}

module.exports = _.merge(config, envConfig);