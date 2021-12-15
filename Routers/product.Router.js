const router = require('express').Router();
const {AddProduct,GetProduct,GetProducts,DeleteProduct,UpdateProduct} = require('../Controllers/Product.controller');
const {verifyTokenAndAthorization} = require('../Utils/GenerateTokens');


router.post('/add',verifyTokenAndAthorization,AddProduct);
router.get('/allProducts',GetProducts);
router.get('/:id',GetProduct);
router.delete('/delete/:id',verifyTokenAndAthorization,DeleteProduct);
router.put('/update/:id',verifyTokenAndAthorization,UpdateProduct);


module.exports = router;