var mongoose = require('mongoose');

var infoSchema = mongoose.Schema({
    domaine:String,
    email:{type:String,
        unique:true
    },
    picture:String,
    Expert_name:String,
    dateActual: { type: Date, default: Date.now },
    dispo_Info:{
            heure_dep: String,
            heure_ter: String,
            dispo_day:String
    }
});


module.exports = mongoose.model('ExpertInfo',infoSchema);