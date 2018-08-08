const playerController = (Player) => {

    const _allowedQueryParams = [
        'first_name',
        'last_name',
        'team_code'
    ]

    const get = (req, res) => {
        var query = { };
        _allowedQueryParams.forEach((p) => {
            if (req.query[p])
                query[p] = req.query[p];
        });

        Player.find(query, (err, players) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else {
                res.status(200);
                res.json(players);
            }
        });
    };

    const getWithId = (req, res) => {
        res.json(req.player);
    };

    return {
        get: get,
        getWithId: getWithId
    }

};

export = playerController;