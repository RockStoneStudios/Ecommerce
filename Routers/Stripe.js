const router = require('express').Router();
const{Payment} = require('../Controllers/Payment.controller');
const {VerifyToken} = require('../Utils/GenerateTokens')


router.post('/payment',VerifyToken,Payment);

module.exports = router;