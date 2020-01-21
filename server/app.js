require('./config/config');
require('./models/db');
require('./config/passportConfig');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport  = require('passport');
var logger = require('morgan');

const rtsIndex = require('./routes/index.router');
var app = express();
//app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json({ limit: "50mb" })) 
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use('/api',rtsIndex);
//error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});



//start server
app.listen(process.env.PORT,() => console.log(`server started at port: ${process.env.PORT}`));
