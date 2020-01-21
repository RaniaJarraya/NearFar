const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var user = mongoose.model('User');
passport.use(
    new localStrategy({ usernameField: 'email'},
        (username,password,done) => {
            user.findOne({email:username},
                (err,user) => {
                    if (err)
                        return done(err);
                         //unknown user
                    else if (!user)
                        return done(null,false, {message:'Email is not registered'});
                        //wrong password
                    else if (user.password!=password)
                        return done(null,false, {message:'Wrong password.'});
                        // authentication succeeded
                    else
                        return done (null,user);


                });
               
                    

        })
);


