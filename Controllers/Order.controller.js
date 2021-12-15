const Order = require('../Models/Order');


const AddOrder = async(req,res)=>{
   

    const newOrder = new Order(req.body);
     try {
        const result = await newOrder.save();
        if(result) return res.status(201).json({message : "Order created Successfull",result});
         res.status(400).json({message : "Could not save Order"});
     }catch(error){
         res.status(500).json(error);
     }
}

const GetOrders = async(req,res)=>{
     
     try{
          const order = await Order.find();
         res.status(200).json(order);
     }catch(error){
         res.status(500).json(error);
     }
}

const GetOrder = async(req,res)=>{
    try {
        const order = await Order.find({ userId : req.params.userId});
        if(order) return res.status(200).json(order);
        res.status(400).json({message : "not Found Product with this Id!!"});

    }catch(error){
        res.status(500).json(error);
    }
}

const DeleteOrder = async(req,res)=>{
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.id);
        if(deleteOrder) return res.status(201).json({message : "Product Delete with Exit"});
        res.status(400).json({message : "Product with this Id already not Exist"});

    }catch(error){
        res.status(500).json(error);
    }
}

const UpdateOrder = async(req,res)=>{
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true});
        if(updateOrder) return res.status(201).json({message : "Order Update with Exit"});
        res.status(400).json({message : "Order with this Id already no Exist"})
    }catch(error){
        res.status(500).json(error);
    }
}

const Monthly = async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try {
       const icome = await Order.aggregate([
           { $match : {createdAt : {$gte : previousMonth}}},
           {
               $project : {
                   month : {$month : "$createdAt"},
                   sales : "$amount",

               },
            },
               {
                   $group : {
                       _id : "$month",
                       total : {$sum : "$sales"}
                   },
               },
           
       ]);
       res.status(200).json(icome);
    }catch(error){
        res.status(500).json(error);
    }
}


module.exports = {
  AddOrder,
  GetOrder,
  GetOrders,
  UpdateOrder,
  DeleteOrder,
  Monthly
}