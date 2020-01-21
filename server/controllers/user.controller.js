const mongoose = require('mongoose');
const User = mongoose.model('User');
const ExpertInfo=require ('../models/expetInfo.model');
const ClientInfo=require ('../models/clientinfo.model');
const Process=require('../models/process.model');
const Consult=require('../models/consultation.model');
const passport = require('passport');
const fs =require('fs');
var Binary = require('mongodb').Binary;
const _ = require('lodash');
mongoose.set('useFindAndModify', true);
mongoose.set('useFindAndUpdate', false);
mongoose.set('useFindAndDelete', false);
module.exports.saveinfo =(req,res,next) =>{
    var info= new ExpertInfo();
    info.domaine=req.params.domaine;
    info.dispo_Info.heure_dep=req.body.heure_dep;
    info.dispo_Info.heure_ter=req.body.heure_ter;
    info.dateActual=new Date ();
    info.dispo_Info.dispo_day=req.body.dispo_day;
    info.email=req.params.email;
    info.Expert_name=req.params.name;
    info.picture=req.body.picture;
    info.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
            res.status(422).send(['Duplicate email address found.']);
            else
            return next(err);
        }
        

    });

}

module.exports.register = (req,res,next) =>{
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    user.domaine = req.body.domaine;
    user.url=req.body.url;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
            res.status(422).send(['Duplicate email address found.']);
            else
            return next(err);
        }
        

    });
    
}
module.exports.authenticate = (req,res,next) => {
    //call for passport authentication
    passport.authenticate('local',(err,user,info) => {
        //error from passport middleware
        if (err) return res.status(400).json(err);
        //registered user
        else if (user) return res.status(200).json({"token": user.generateJwt() });
        //unknown user or wrong password
        else return res.status(404).json(info);

    })(req,res);


}//to obtain user's profile
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['firstName','lastName','email','role','domaine','url']) });
        }
    );
}

module.exports.delete = (req, res, next) =>{
    var email1= req.params.email;
    var day =req.params.day;
        ExpertInfo.findOneAndRemove({
            'dispo_Info.dispo_day':day
            
        }).exec(function (error, doc) {
            if(ExpertInfo.find({email:email1}, (err, doc) => {
                if (err) throw err;
                if (!doc) {
                    res.json({
                        message: 'No results',
                        success: false
                    });
                    return;
                }
                res.json({
                    message: 'success',
                    success: true               
                })
            }));
        });
 };

 module.exports.update = (req, res, next) =>{
  //const id =req.params.id ;
  ExpertInfo.findOneAndUpdate({_id:req.params.id}, {$set: req.body}, function (err, doc) {
    if (err) return next(err);
    res.send('Product udpated.');
});
}


module.exports.ModName = (req, res, next) =>{
    User.findOne({'email':req.params.email}, function (err, foundObject) {
        //console.log(req.params.email);
      if (err) {
          console.log(err);
          res.status(500).send()}
        else{
            if(!foundObject){
                res.status(404).send()
            }else{
                if(req.params.newName)
                {foundObject.firstName=req.params.newName;}
            }
            foundObject.save(function(err,updatedObject){
                if(err){
                    console.log(err);
                    res.status(500).send();
                }else{
                    res.send(updatedObject)
                }
            })
        }
  });
  }

  module.exports.ModLastName = (req, res, next) =>{
    User.findOne({'email':req.params.email}, function (err, foundObject) {
        //console.log(req.params.email);
      if (err) {
          console.log(err);
          res.status(500).send()}
        else{
            if(!foundObject){
                res.status(404).send()
            }else{
                if(req.params.newLastName)
                {foundObject.lastName=req.params.newLastName;}
            }
            foundObject.save(function(err,updatedObject){
                if(err){
                    console.log(err);
                    res.status(500).send();
                }else{
                    res.send(updatedObject)
                }
            })
        }
  });
  }

  module.exports.ModEmail = (req, res, next) =>{
    User.findOne({'email':req.params.email}, function (err, foundObject) {
        //console.log(req.params.email);
      if (err) {
          console.log(err);
          res.status(500).send()}
        else{
            if(!foundObject){
                res.status(404).send()
            }else{
                if(req.params.newEmail)
                {foundObject.email=req.params.newEmail;}
            }
            foundObject.save(function(err,updatedObject){
                if(err){
                    console.log(err);
                    res.status(500).send();
                }else{
                    res.send(updatedObject)
                }
            })
        }
  });
  }



  module.exports.ModPass = (req, res, next) =>{
    User.findOne({'email':req.params.email}, function (err, foundObject) {
        //console.log(req.params.email);
      if (err) {
          console.log(err);
          res.status(500).send()}
        else{
            if(!foundObject){
                res.status(404).send()
            }else{
                if(req.params.newPass)
                {foundObject.password=req.params.newPass;}
            }
            foundObject.save(function(err,updatedObject){
                if(err){
                    console.log(err);
                    res.status(500).send();
                }else{
                    res.send(updatedObject)
                }
            })
        }
  });
  }

  module.exports.ModDomaine = (req, res, next) =>{
    User.findOne({'email':req.params.email}, function (err, foundObject) {
        //console.log(req.params.newDomaine);
      if (err) {
          console.log(err);
          res.status(500).send()}
        else{
            if(!foundObject){
                res.status(404).send()
            }else{
                if(req.params.newDmaine!="")
                {   //console.log(req.params.newDomaine);
                    foundObject.domaine=req.params.newDomaine;}
            }
            foundObject.save(function(err,updatedObject){
                if(err){
                    console.log(err);
                    res.status(500).send();
                }else{
                    res.send(updatedObject)
                }
            })
        }
  });
  }



module.exports.getconsult = (req, res, next) =>{
    var email= req.params.email;
    Consult.find({
        Expert_email:email
    }, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'consult does not exist',
                success: false
            });
            return;
        }
        res.send(doc);          

}).sort('consult_Info.day').sort('consult_Info.time');;

};


module.exports.reserve = (req, res, next) =>{
    var consult = new Consult();
    consult.Expert_email = req.body.E_email;
    consult.Client_email = req.body.C_email;
    consult.dateActual=new Date ();
    consult.Expert_picture = req.body.E_picture;
    consult.Client_picture = req.body.C_picture;
    consult.Expert_name = req.body.E_name;
    consult.Client_name = req.body.C_name;
    consult.consult_Info.time = req.params.time;
    consult.consult_Info.day = req.body.day;
    consult.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
            res.status(422).send(['Duplicate email address found.']);
            else
            return next(err);
        }
        

    });    
}

/*module.exports.searchbyName = (req, res, next) =>{
    var name= req.params.Search_Name.toLowerCase();
    ExpertInfo.find({
        Expert_name:name
    }, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'expert does not exist',
                success: false
            });
            return;
        }
        res.send(doc);          

}).sort('dispo_Info.dispo_day');
}
*/

module.exports.searchbyName = (req, res, next) =>{
    var name= req.params.Search_Name.toLowerCase();
    User.find({
        firstName:name
    }).exec(function (error, doc) {
        if(User.find({'role':"Expert"}, (err, doc) => {
            if (err) throw err;
            if (!doc) {
                res.json({
                    message: 'No results',
                    success: false
                });
                return;
            }
            res.send(doc);          
    
    }));
     });
}


module.exports.searchbyDomaine = (req, res, next) =>{
    var Domaine= req.params.Search_Domaine.toUpperCase();
    User.find({
        domaine:Domaine
    }).exec(function (error, doc) {
        if(User.find({'role':"Expert"}, (err, doc) => {
            if (err) throw err;
            if (!doc) {
                res.json({
                    message: 'No results',
                    success: false
                });
                return;
            }
            res.send(doc);          
    
    }));
     });
}





/*module.exports.searchbyDomaine = (req, res, next) =>{
    var Domaine= req.params.Search_Domaine.toUpperCase();
    ExpertInfo.find({
        domaine:Domaine
    }, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'expert does not exist',
                success: false
            });
            return;
        }
        res.send(doc);          

}).sort('dispo_Info.dispo_day');
}*/

module.exports.getdays = (req, res, next) =>{
    var email1= req.params.email;
    ExpertInfo.find({
        email:email1
    }, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'No results',
                success: false
            });
            return;
        }
        res.send(doc);          

}).sort('dispo_Info.dispo_day')

}





/*module.exports.searchbyDomaine = (req, res, next) =>{
    var Domaine= req.params.Search_Domaine.toUpperCase();
    var day =req .params.dispoday;
    ExpertInfo.find({
        domaine:Domaine
    }).exec(function (error, doc) {
        if(ExpertInfo.find({'dispo_Info.dispo_day':day}, (err, doc) => {
            if (err) throw err;
            if (!doc) {
                res.json({
                    message: 'No results',
                    success: false
                });
                return;
            }
            res.send(doc);          
    
    }));
     });
}*/





module.exports.getcolor = (req, res, next) =>{
    var name= req.params.expertName;
    var day =req .params.consultday;
    Consult.find({
        Expert_name:name
    }).exec(function (error, doc) {
        if(Consult.find({'consult_Info.day':day}, (err, doc) => {
            if (err) throw err;
            if (!doc) {
                res.json({
                    message: 'No results',
                    success: false
                });
                return;
            }
            res.send(doc);          
    
    }));
     });
        
};


/*module.exports.searchbyName = (req, res, next) =>{
    var name= req.params.Search_Name.toLowerCase();
    var day =req .params.dispoday;
    ExpertInfo.find({
        Expert_name:name
    }).exec(function (error, doc) {
        if(ExpertInfo.find({'dispo_Info.dispo_day':day}, (err, doc) => {
            if (err) throw err;
            if (!doc) {
                res.json({
                    message: 'No results',
                    success: false
                });
                return;
            }
            res.send(doc);          
    
    }));
     });
        
};*/






module.exports.getreservation = (req, res, next) =>{var email= req.params.email;
    Consult.find({
        Client_email:email
    }, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'No results',
                success: false
            });
            return;
        }
        res.send(doc);          

}).sort('consult_Info.day').sort('consult_Info.time');

}
module.exports.getexpert = (req, res, next) =>{
    
    ExpertInfo.findById(req.params._id, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'No results',
                success: false
            });
            return;
        }
        res.send(doc);          

});
}
module.exports.getall = (req, res, next) =>{
    var email1=req.params.email;
    ExpertInfo.find( {email:email1 }, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'No results',
                success: false 
            });
            return;
        }
        res.send(doc);          

}).sort('dispo_Info.dispo_day');
}

module.exports.putProcess = (req, res, next) =>{
    var timing = new Process();
    timing.time = req.params.time;
    timing.day=req.params.day;
    timing.expert_Email=req.params.email;
    timing.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
            res.status(422).send(['Duplicate time found.']);
            else
            return next(err);
        }
        

    });    
};
module.exports.deleteProcess = (req, res, next) =>{
    var email1= req.params.email;
    var day1 =req.params.day;
    var time1=req.params.time;
        Process.findOneAndRemove({
            expert_Email:email1
        }).exec(function (error, doc) {
            if(Process.find({day:day1}).exec(function (error, doc) {
                if(Process.find({time:time1}, (err, doc) => {
                        if (err) throw err;
                        if (!doc) {
                            res.json({
                                message: 'No results',
                                success: false
                            });
                            return;
                        }
                        res.json({
                            message: 'success',
                            success: true               
                })
            }));
        }));})

 };

 module.exports.getProcess = (req, res, next) =>{
    var email= req.params.email;
    var day =req .params.day;
    Process.find({
        expert_Email:email
    }).exec(function (error, doc) {
        if(Process.find({day:day}, (err, doc) => {
            if (err) throw err;
            if (!doc) {
                res.json({
                    message: 'No results',
                    success: false
                });
                return;
            }
            res.send(doc);          
    
    }));
     });
        
};

module.exports.rate = (req, res, next) =>{
    var info = new ClientInfo();
    info.expert_email = req.params.E_email;
    info.client_email = req.params.C_email;
    info.rate=req.params.rate;
    info.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
            res.status(422).send(['Duplicate time found.']);
            else
            return next(err);
        }
        

    }); 
}


module.exports.getrate= (req, res, next) =>{
    var email= req.params.email;
    ClientInfo.find({
        expert_email:email
    }, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'No results',
                success: false
            });
            return;
        }
        res.send(doc);          

});

}

module.exports.getNotif = (req, res, next) =>{
    var email= req.params.email;
    Consult.find({
        Expert_email:email
    }, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            res.json({
                message: 'No results',
                success: false
            });
            return;
        }
        res.send(doc);          

})
        
};
