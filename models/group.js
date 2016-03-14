var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    url: { type: String, required: true, index: { unique: true } },
    description: {type: String},
    visibility: { type: String},
    postpolicy: { type: String},
    owner: { type: String},
    admins: { type: Array},
    members: { type: Array},
});
 
module.exports = mongoose.model('Group', GroupSchema);