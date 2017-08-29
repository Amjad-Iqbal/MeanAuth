const express = require('express');
const router = express.Router();

//Register Router 
router.get('/register' , (req , res , next)=>{
   // document.body.innerHTML = "Register";
    res.send("Registration Page");
});

//Authenticate 
router.get('/authenticate' , (req , res , next)=>{
    res.send("Authenticate");
});

//Profile
router.get('/profile' , (req , res , next)=>{
    res.send("User Profile");
});

//Validate 
router.get('/validate' , (req , res , next)=>{
    res.send("Validation");
});

module.exports = router;