var mongoose = require('mongoose');
var processSchema = mongoose.Schema({
    time:String,
    expert_Email:String,
    day:String

});
module.exports = mongoose.model('Process',processSchema);