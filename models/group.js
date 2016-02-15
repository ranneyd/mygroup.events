var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
});

GroupSchema.pre('save', function(next) {
    var group = this;

    group.name = group.name.toLowerCase();
});

module.exports = mongoose.model('Group', GroupSchema);