var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: { type: String, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    description: { type: String },
    banner: { type: String, required: true },
    location: { type: String, },
    rsvp: { type: String, required: true },
    rsvpCount: { type: Number, required: true , default: 0},
    rsvps: { type: Schema.Types.Mixed, required: true, default: []},
    owner: { type: String, required: true },
    group: { type: String, required: true }
});

EventSchema.pre('save', function(next) {
    var event = this;

    if(event.rsvp !== "anonymous") {
        event.rsvps = [];
    }

    // TODO: validate and error (GRACEFULLY) if there's an error
    next();
});

module.exports = mongoose.model('Event', EventSchema);