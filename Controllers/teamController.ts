const teamController = (Team) => {

    const _allowedQueryParams = [
        'name',
        'short_name'
    ]

    const get = (req, res) => {
        let query = { };
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

    const getWithTeamCode = (req, res) => {
        res.json(req.team);
    };

    return {
        get: get,
        getWithTeamCode: getWithTeamCode
    }

};

export = teamController;