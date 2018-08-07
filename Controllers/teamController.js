var teamController = (Team) => {

    var _allowedQueryParams = [
        'name',
        'short_name'
    ]

    var get = (req, res) => {
        var query = { };
        _allowedQueryParams.forEach((p) => {
            if (req.query[p]) {
                query[p] = new RegExp(req.query[p], 'i');
            }
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

    var getWithTeamCode = (req, res) => {
        res.json(req.team);
    };

    return {
        get: get,
        getWithTeamCode: getWithTeamCode
    }

};

module.exports = teamController;