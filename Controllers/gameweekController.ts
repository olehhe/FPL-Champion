const gameweekController = (Gameweek) => {

    const _allowedQueryParams = [];

    const get = (req, res) => {
        var query = { };
        _allowedQueryParams.forEach((p) => {
            if (req.query[p])
                query[p] = req.query[p];
        });

        Gameweek.find(query, (err, gameweeks) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else {
                res.status(200);
                res.json(gameweeks);
            }
        });
    };

    const getByWeekNumber = (req, res) => {
        res.json(req.gameweek);
    };

    return {
        get: get,
        getByWeekNumber: getByWeekNumber
    }
};

export = gameweekController;