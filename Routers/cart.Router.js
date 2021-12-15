const router = require('express').Router();
const{AddtoCart,GetCarts,GetCart,DeleteCart,UpdateCart} = require('../Controllers/Cart.controller');
const {verifyTokenAndAthorization} = require('../Utils/GenerateTokens');


router.post('/addCart',verifyTokenAndAthorization,AddtoCart);
router.get('/allCart',verifyTokenAndAthorization,GetCarts);
router.get('/:userId',verifyTokenAndAthorization,GetCart);
router.delete('/:userId',verifyTokenAndAthorization,DeleteCart);
router.put('/:userId',verifyTokenAndAthorization,UpdateCart);

module.exports = router;