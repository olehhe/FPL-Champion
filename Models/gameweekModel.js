var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameweekModel = new Schema({
    id: { type: Number },
    name: { type: String },
    deadline_time: { type: String },
    average_entry_score: { type: Number },
    finished: { type: Boolean },
    data_checked: { type: Boolean },
    highest_scoring_entry: { type: Number },
    deadline_time_epoch: { type: Number },
    deadline_time_game_offset: { type: Number },
    deadline_time_formatted: { type: String },
    highest_score: { type: Number },
    is_previous: { type: Boolean },
    is_current: { type: Boolean },
    is_next: { type: Boolean }
});

module.exports = mongoose.model('gameweek', gameweekModel);