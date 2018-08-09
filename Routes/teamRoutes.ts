import * as express from "express";
import {Team} from "../Models/teamModel";
import {teamController} from "../Controllers/teamController";
const teamRouter = express.Router();
const teamCtrl = new teamController();

const routes = () => {

    /* Middleware */
    teamRouter.use('/:teamCode', (req, res, next) => {
        Team.findOne({ 'code': req.params.teamCode }, (err, team) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else if (team) {
                console.log("INSODE Middleware")
                req.team = team;
                next();
            }
            else {
                res.status(404);
                res.send('No team found');
            }
        });
    });

    /* Routes */
    teamRouter.route('/')
        .get(teamCtrl.get);

    teamRouter.route('/:teamCode')
        .get(teamCtrl.getWithTeamCode);

    return teamRouter;
};

export = routes;