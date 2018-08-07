var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TEAMSIZE_LIMIT = 15;

var userModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    players: { 
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'playerModel'
        }],
        validate: [teamSizeLimit, '{PATH} exceeds the limit number of ' + TEAMSIZE_LIMIT]
    }
});

function teamSizeLimit(val) {
    return val.length <= 15;
}

module.exports = mongoose.model('user', userModel);