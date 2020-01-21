const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Firstname can\'t be empty'
    },
    lastName: {
        type: String,
        required: 'lastname can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true

    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be at least 4 character long']

    },
    role : {
        type: String,
        required: 'role number can\'t be empty'
    },
    domaine :String,


    url:String,


    salSecret: String//encryption of pass
});
// custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val); 
}, 'Invalid email.');
// Events
/*userSchema.pre('save', function (next){
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(this.password, salt,(err,hash) => {
            this.password = hash;
            this.salSecret = salt;
            next();

        });
    });
});
//function to verify password for login part
userSchema.methods.verifyPassword = function (password){
    return bcrypt.compare(password,this.password);
};*/
userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP

    });
}

mongoose.model('User',userSchema);
