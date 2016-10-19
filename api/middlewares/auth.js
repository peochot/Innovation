const User = require('../models/user');
const publicRoutes=["/login","/register"];
export default (req,res,next)=>{
  //if url in public route no need to validate
  if(publicRoutes.indexOf(req.url)!=-1||req.url.startsWith("/activate?token=")||req.url.startsWith("/file/")) {
    return next();
  }
  let sessionToken = req.headers.authorization;
  if(sessionToken){
      User.findByToken(sessionToken).then(
        (user)=>{
            req['user']=user;
            next();
        },(err)=>{
          res.status(401).send({message:err});
        });
  }else{
    res.status(401).send({message:"not authorized"});
  }
};
