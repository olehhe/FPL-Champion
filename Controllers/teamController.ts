import {Team} from "../Models/teamModel";

export class teamController {
    public constructor(){};

    get = (req, res) => {
        const _allowedQueryParams = [
            'name',
            'short_name'
        ]
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
                let returnTeams = [];
                teams.forEach((item) => {
                    var team = item.toJSON();
                    team.links = {};
                    team.links.self = 'http://' + req.headers.host + '/api/teams/' + encodeURIComponent(team.code);

                    returnTeams.push(team);
                });

                res.status(200);
                res.json(returnTeams);
            }
        });
    };

    getWithTeamCode = (req, res) => {
        console.log("getWithTeamCode")
        res.json(req.team);
    };
};