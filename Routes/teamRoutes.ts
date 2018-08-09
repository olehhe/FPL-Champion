import * as express from "express";
import {teamController} from "../Controllers/teamController";
const teamRouter = express.Router();
const teamCtrl = new teamController();

const routes = () => {
    /* Routes */
    teamRouter.route('/').get(teamCtrl.get);

    teamRouter.route('/:teamCode').get(teamCtrl.getWithTeamCode);

    return teamRouter;
};

export = routes;