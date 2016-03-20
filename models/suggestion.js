var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SuggestionSchema = new Schema({
    sentiment: { type: String },
    suggestion: {type: String},
    user: { type: String },
    url: { type: String }
});
 
module.exports = mongoose.model('Suggestion', SuggestionSchema);