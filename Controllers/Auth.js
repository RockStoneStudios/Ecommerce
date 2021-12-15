const User = require('../Models/User');
const {EncryptPassword,PasswordCompare}= require('../Utils/EncryptPassword');
const { GenerateToken } = require('../Utils/GenerateTokens');

const SignUp = async(req,res)=>{
    const {username,email,password} = req.body;
     if(username.length<1) return res.status(400).json({message : "Invalid Name"});
     if(!email.includes('@') || !email.endsWith('.com')) return res.status(400).json({message : "Invalid Email not Contains @ or not end with .com"});
     if(password.length<8) return res.status(400).json({message : "Password Invalid you need enter with min 8 Characters"});

     const userExist = await User.findOne({email : email});
     const encrypt = await EncryptPassword(password);
     if(!userExist){
        const newUser = new User({
            username,
            email,
            password : encrypt
        });
   
       try {
           const result = await newUser.save();
           if(result) return res.status(201).json({message : "User Create with Exit",newUser});
           res.status(400).json({message : "Not save User"});
       }catch(error){
           res.status(500).json(error);
       }
     } else {
         res.status(400).json({message : "this User already Exist"});
     }
 
}

const SignIn = async(req,res)=>{
    const {email,password} = req.body;
    if(!email.includes('@') || !email.endsWith('.com')) return res.status(400).json({message : "Invalid Email not Contains @ or not end with .com"});
     if(password.length<8) return res.status(400).json({message : "Password Invalid you need enter with min 8 Characters"});
    const userExist = await User.findOne({email : email});
    if(userExist){
         if(PasswordCompare(password,userExist.password)) {
              const payload = {id : userExist._id, email : userExist.email, isAdmin : userExist.isAdmin}
              const token = await GenerateToken(payload);
             res.status(200).json({message : "Login Successfull",token});
         }
    } else {
        res.status(400).json({message : "Not User with this Email"});
    }

}

module.exports = {
    SignUp,
    SignIn
}