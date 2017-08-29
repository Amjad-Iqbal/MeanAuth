const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connecting With MongoDb
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected' , ()=>{
    console.log("connected to Database"+config.database);
});

//On Error
mongoose.connection.on('error',(err)=>{
    console.log("Error on Connection" + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname , 'public')));

//Body Parser 
app.use(bodyParser.json());


//Use Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

app.get('/users',(req,res)=>{
    res.send("Your are on A User page");
});

app.get('/',(req,res)=>{
    res.send('Working FIne');
   
});

app.listen(port , ()=>{
    console.log("Server is running Fine");
});