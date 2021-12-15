const router = require('express').Router();
const {AddOrder,GetOrders,GetOrder,DeleteOrder,UpdateOrder,Monthly} = require('../Controllers/Order.controller');
const {verifyTokenAndAthorization,VerifyToken} = require('../Utils/GenerateTokens');

router.post('/addOrder',VerifyToken,AddOrder);
router.get('/allOrders',verifyTokenAndAthorization,GetOrders);
router.get('/:userId',verifyTokenAndAthorization,GetOrder);
router.delete('/:userId',verifyTokenAndAthorization,DeleteOrder);
router.put('/:userId',verifyTokenAndAthorization,UpdateOrder);
router.get('/icome',verifyTokenAndAthorization,Monthly);


module.exports = router;