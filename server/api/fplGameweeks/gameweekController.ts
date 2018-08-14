import * as logger from '../../utils/logger';

const gameweekController = (Gameweek) => {

    const _allowedQueryParams = [
        'finished'
    ];

    const get = (req, res) => {
        var query = { };
        _allowedQueryParams.forEach((p) => {
            if (req.query[p])
                query[p] = req.query[p];
        });

        Gameweek.find(query, (err, gameweeks) => {
            if (err) {
                logger.log(err);
                res.status(500);
                res.send(err);
            }
            else {
                let returnGameweeks = [];
                gameweeks.forEach((item) => {
                    let gameweek = item.toJSON();
                    gameweek.links = {};
                    gameweek.links.self = 'http://' + req.headers.host + '/api/gameweeks/' + encodeURIComponent(gameweek.id);

                    returnGameweeks.push(gameweek);
                });

                logger.log('Returning data with OK 200');
                res.status(200);
                res.json(returnGameweeks);
            }
        });
    };

    const getByWeekNumber = (req, res) => {
        var gameweek = req.gameweek.toJSON();
        gameweek.links = {};
        gameweek.links.FilterByFinishedStatus = 'http://' + req.headers.host + '/api/gameweeks/?finished=' + gameweek.finished;

        logger.log('Returning data with OK 200');
        res.json(gameweek);
    };

    return {
        get: get,
        getByWeekNumber: getByWeekNumber
    }
};

export = gameweekController;