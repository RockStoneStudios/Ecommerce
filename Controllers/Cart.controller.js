const Cart = require('../Models/Cart');

const AddtoCart = async(req,res)=>{
    const newCart = new Cart(req.body);
     try{
         const savedCart = await newCart.save();
       if(savedCart) return res.status(200).json(savedCart);
        res.status(400).json({message : "Could not created Cart"});


     }catch(error){
         res.status(500).json(error);
     }
}

const UpdateCart = async(req,res)=>{
   try {
       const updateCart = await Cart.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true});
       res.status(200).json(updateCart);
    }catch(error){
        res.status(500).json(error)
    }
}

const DeleteCart = async(req,res)=>{
    try {
        const deleteCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Cart Delete Successfull"});
    }catch(error){
        res.status(500).json(error);
    }
}

const GetCart = async(req,res)=>{
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json(error);
    }
}


const GetCarts = async(req,res)=>{
      try{
          const carts = await Cart.find();
           res.status(200).json(carts);
      }catch(error){
          res.status(500).json(error);
      }
}

module.exports = {
    GetCart,
    GetCarts,
    AddtoCart,
    DeleteCart,
    UpdateCart
}