var logger = require('../utils/logger');

module.exports = () => {
    return (err, req, res, next) => {
        logger.log(err);
        res.status(500);
        res.send(err);
    };
};