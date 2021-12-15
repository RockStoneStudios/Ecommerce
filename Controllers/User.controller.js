const User = require('../Models/User');
const {EncryptPassword} = require('../Utils/EncryptPassword');


const UpdateUser = async(req,res)=>{
     const {username,email} = req.body;
     if(req.body.password) {
        req.body.password = await EncryptPassword(req.body.password);

     }

      try{
          const updateUser = await User.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true});
          if(updateUser) return res.status(201).json({message : "Update User Successfull"});
          res.status(400).json({message : "Could not update User!!"});
      }catch(error){
          res.status(500).json(error);
      }
}


const GetUser = async(req,res)=>{
    try {
        const user = await User.findOne({_id : req.params.id}).select('-password  -createdAt -updatedAt -__v');
        if(user) return res.status(400).json(user);
         res.status(400).json({message : "Not User"});
    }catch(error){
        res.status(500).json(error);
    }
}

const DeleteUser = async(req,res)=>{
    try {
        const userDelete = await User.findByIdAndDelete({_id : req.params.id});
        if(userDelete) return res.status(200).json({message : "Delete User with Exit"});
        res.status(400).json({message : "Could not Delete User" });
    }catch(error){
        res.status(500).json(error);
    }
}



const GetUsers = async(req,res)=>{
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({_id : -1}).limit(5) : await User.find();
        if(users) return res.status(200).json(users);
        return res.status(400).json({message : "No Users"})
    }catch(error){
        res.status(500).json(error);
    }
}
const GetStatics = async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
     try{
         const data = await User.aggregate([
             {$match : {createdAt : {$gte : lastYear}}},
             {
             $project :{
                 month : {$month : "$createdAt"},
             }
            },
            {
            $group :{
                _id : "$month",
                total : {$sum :1}
            }
            }
         ]);
         res.status(200).json(data);
     }catch(error){
         res.status(500).json(error);
     }
}


module.exports = {
    UpdateUser,
    GetUser,
    DeleteUser,
    GetUsers,
    GetStatics
}