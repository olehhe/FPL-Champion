import { Document, Schema, Model, model} from "mongoose";
import {ITeam} from "../Interfaces/team";

interface ITeamModel extends ITeam{};

const teamModelSchema: Schema = new Schema({
    id: { type: Number },
    current_event_fixture: { type: Array },
    next_event_fixture: { type: Array },
    name: { type: String },
    code: { type: Number },
    short_name: { type: String },
    unavailable: { type: Boolean },
    strength: { type: Number },
    position: { type: Number },
    played: { type: Number },
    win: { type: Number },
    loss: { type: Number },
    draw: { type: Number },
    points: { type: Number },
    form: { type: Number },
    link_url: { type: String },
    strength_overall_home: { type: Number },
    strength_overall_away: { type: Number },
    strength_attack_home: { type: Number },
    strength_attack_away: { type: Number },
    strength_defence_home: { type: Number },
    strength_defence_away: { type: Number },
    team_division: { Type: Number }
});

export const Team = model<ITeamModel>('team', teamModelSchema);