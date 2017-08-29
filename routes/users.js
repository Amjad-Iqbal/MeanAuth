const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require('../models/user');




//Register Router 
router.post('/register' , (req , res , next)=>{
    let newUser = new User({
        name     : req.body.name,
        email    : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
   // document.body.innerHTML = "Register";
   // res.send("Registration Page");
    
    User.addUser(newUser,(err , user)=>{
        if(err){
           res.json({success : false,msg : 'Failed to register user' });
           }else{
            res.json({ success : true,msg : 'Succesfull registerd user'});
           }
    });
    
});

//Authenticate 
router.post('/authenticate' , (req , res , next)=>{
    res.send("Authenticate");
});

//Profile
router.post('/profile' , (req , res , next)=>{
    res.send("User Profile");
});

//Validate 
router.get('/validate' , (req , res , next)=>{
    res.send("Validation");
});

module.exports = router;