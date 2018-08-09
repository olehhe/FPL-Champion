"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const teamModelSchema = new mongoose_1.Schema({
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
exports.Team = mongoose_1.model('team', teamModelSchema);
