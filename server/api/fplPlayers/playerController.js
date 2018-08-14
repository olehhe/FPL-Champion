"use strict";
const playerController = (Player) => {
    const _allowedQueryParams = [
        'first_name',
        'second_name',
        'team_code'
    ];
    const get = (req, res) => {
        let query = {};
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
                let returnPlayers = [];
                players.forEach((item) => {
                    let player = item.toJSON();
                    player.links = {};
                    player.links.self = 'http://' + req.headers.host + '/api/players/' + encodeURIComponent(player._id);
                    returnPlayers.push(player);
                });
                res.status(200);
                res.json(returnPlayers);
            }
        });
    };
    const getWithId = (req, res) => {
        let player = req.player.toJSON();
        player.links = {};
        let endpoint = 'http://' + req.headers.host + '/api/players/';
        player.links.FilterByFirstName = endpoint + '?first_name=' + encodeURIComponent(player.first_name);
        player.links.FilterByLastName = endpoint + '?second_name=' + encodeURIComponent(player.second_name);
        player.links.FilterByTeamCode = endpoint + '?team_code=' + encodeURIComponent(player.team_code);
        res.json(player);
    };
    return {
        get: get,
        getWithId: getWithId
    };
};
module.exports = playerController;
