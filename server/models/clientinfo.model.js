var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    client_email:String,
    rate:String,
    expert_email:String,
    
});


module.exports = mongoose.model('clientInfo',clientSchema);