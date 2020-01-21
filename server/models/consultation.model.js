var mongoose = require('mongoose');
var consultSchema = mongoose.Schema({
    Expert_name:String,
    Client_name:String,
    Expert_email:String,
    Client_email:String,
    Expert_picture:String,
    Client_picture:String,
    dateActual: { type: Date, default: Date.now },
    consult_Info:{
            time: String,
            day: String,
    }
});
consultSchema.methods.verifyDay= function verifyDay (Day) {
    return this.model('Consult').find({ day: this.consult_Info.day }, Day);
  };

module.exports = mongoose.model('Consult',consultSchema);