const jwt = require('jsonwebtoken');
const passport=require('passport');
const bcrypt = require('bcryptjs');
const User= require('../models/user');
const MailService=require('../services/Mail');
const randomstring =require('randomstring');
const path = require("path");

module.exports.facebook=function(req,res,next){
  passport.authenticate('facebook', {session: false,scope:'email'})(req,res,next);
  return;
};
function oauthCallback(name,req,res,next){
  passport.authenticate(name, {
    session: false,
  },(err,user,info)=>{
    let sessionToken=user.generateJWT();
    res.cookie('mycookie', sessionToken, { maxAge: 10000, httpOnly: false});
    res.redirect('/');
  })(req,res,next);
}
module.exports.facebookCallback=function(req,res,next){
  return oauthCallback('facebook',req,res,next);
}
module.exports.google=function(req,res,next){
  //'https://www.googleapis.com/auth/gmail.compose'
  passport.authenticate('google', {session: false,scope : ['profile', 'email','https://www.googleapis.com/auth/gmail.send'],accessType: 'offline', approvalPrompt: 'force'})(req,res,next);
  return;
};
module.exports.googleCallback=function(req,res,next){
  return oauthCallback('google',req,res,next);
}
module.exports.login=function(req,res){
  if(!req.body.email || !req.body.password) {
     res.status(500).send("All fields required");
     return;
  }
  passport.authenticate('local', {
    session: false
  },function(err,user,info){
    if(err){
      res.status(404).send(err);
    }
    if(user){
      let sessionToken=user.generateJWT();
      res.json({
        message:'succesfully authorized',
        sessionToken:sessionToken
      });
    }else{
      res.status(401).send(info);
    }
  })(req,res);
};

module.exports.register=function(req,res){
  let user = new User({
    firstName:req.body.user.firstName,
    lastName:req.body.user.lastName,
    email: req.body.user.email,
    passhash:bcrypt.hashSync(req.body.user.password,10)
});
  user.save().then(
    (newuser)=>{
      let sessionToken=newuser.generateJWT();
      res.json({
        user: newuser,
        message:'success',
        sessionToken: sessionToken
      });
    },
    (err)=>{
        res.status(500).send(err.message);
    }
  );
};
