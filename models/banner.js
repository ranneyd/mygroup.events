var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BannerSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    url: { type: String, required: true, index: { unique: true } },
    name: { type: Array },

});

module.exports = mongoose.model('Banner', BannerSchema);