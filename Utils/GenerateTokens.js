const jwt = require('jsonwebtoken');


const GenerateToken = async(payload) =>{
    return await jwt.sign(payload,process.env.TOKEN_SECRET);
}

const VerifyToken = async(req,res,next)=>{
    const token = req.get('Authorization');
    if(token){
      const user =  jwt.verify(token.split(" ")[1],process.env.TOKEN_SECRET);
         req.user = user;
         next();
    }else {
        res.status(401).json({message : "You are not Authenticate"});
    }
}

const verifyTokenAndAthorization = (req,res,next)=>{
   VerifyToken(req,res,()=>{
       if(req.user.id == req.params.id || req.user.isAdmin){
           next();
       }else {
           res.status(403).json({message : "Permission Denegate"});
       }
   });
}



module.exports = {
    GenerateToken,
    verifyTokenAndAthorization,
    VerifyToken
}