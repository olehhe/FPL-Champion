var teamController = (Team) => {

    var _allowedQueryParams = [
        'first_name',
        'last_name',
        'team'
    ]

    var get = (req, res) => {
        var query = { };
        _allowedQueryParams.forEach((p) => {
            if (req.query[p])
                query[p] = req.query[p];
        });

        Team.find(query, (err, teams) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else {
                res.status(200);
                res.json(teams);
            }
        });
    };

    var getWithId = (req, res) => {
        var query = { };

        res.json(req.team);
    };

    return {
        get: get,
        getWithId: getWithId
    }

};

module.exports = teamController;