const Product = require('../Models/Product');


const AddProduct = async(req,res)=>{
    const {title,desc,img,categories,size,color,price} = req.body;
    if(title.length<1) return res.status(400).json({message : "Title Invalid!"});
    if(desc.length<1) return res.status(400).json({message : "Desc Invalid!!"});
    if(img.length<1) return res.status(400).json({message : "Img Invalid"});

    const newProduct = new Product(req.body);
     try {
        const result = await newProduct.save();
        if(result) return res.status(201).json({message : "Product created Successfull",result});
         res.status(400).json({message : "Could not save Product"});
     }catch(error){
         res.status(500).json(error);
     }
}

const GetProducts = async(req,res)=>{
     const qnew = req.query.new;
     const qCategory = req.query.category;
     try{
          let product;

          if(qnew){
              products = await Product.find().sort({createdAt:-1}).limit(1);
          }else if(qCategory) {
              products = await Product.find({categories : {$in : [qCategory]}})
          }else {
              products = await Product.find();
          }
         res.status(200).json(products);
     }catch(error){
         res.status(500).json(error);
     }
}

const GetProduct = async(req,res)=>{
    try {
        const product = await Product.findOne({_id : req.params.id});
        if(product) return res.status(200).json(product);
        res.status(400).json({message : "not Found Product with this Id!!"});

    }catch(error){
        res.status(500).json(error);
    }
}

const DeleteProduct = async(req,res)=>{
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if(deleteProduct) return res.status(201).json({message : "Product Delete with Exit"});
        res.status(400).json({message : "Product with this Id already not Exist"});

    }catch(error){
        res.status(500).json(error);
    }
}

const UpdateProduct = async(req,res)=>{
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true});
        if(updateProduct) return res.status(201).json({message : "Product Update with Exit"});
        res.status(400).json({message : "Product with this Id already no Exist"})
    }catch(error){
        res.status(500).json(error);
    }
}

module.exports = {
    AddProduct,
    GetProducts,
    GetProduct,
    DeleteProduct,
    UpdateProduct
}