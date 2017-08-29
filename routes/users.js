const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('../config/database');
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
    const username = req.body.username;
    const password = req.body.password;
 
    User.getUserByUsername(username , ( err , user )=>{
      if(err) throw err;
      if(!user){
          res.json({
              success : false,
              msg : "No user Found Sorry"
          });
      }

      User.comparePassword(password , user.password , (err , isMatch)=>{
        if(err) throw err;
        if(isMatch){
          const token = jwt.sign(user , config.secret ,{
              expiresIn : 604800 // 1 week
          });

          res.json({
              success : true,
              token : 'JWT' + token,
              user:{
                  id : user._id,
                  name : user.name,
                  username : user.username,
                  email : user.email
              }
          });

        }else{
            res.json({
                success : false,
                msg : "No user Found Sorry"
            });
        }
      });
    });


});

//Profile
router.get('/profile' , passport.authenticate('jwt' , { session:false }) , (req , res , next)=>{
    res.json({user: req.user});
});

//Validate 
router.get('/validate' , (req , res , next)=>{
    res.send("Validation");
});

module.exports = router;