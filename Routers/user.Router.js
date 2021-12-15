const router = require('express').Router();
const {verifyTokenAndAthorization} = require('../Utils/GenerateTokens');
const {UpdateUser,GetUser,DeleteUser,GetUsers,GetStatics} = require('../Controllers/User.controller');

router.get('/stats',verifyTokenAndAthorization,GetStatics);
router.put('/:id', verifyTokenAndAthorization,UpdateUser);
router.get('/:id',verifyTokenAndAthorization,GetUser);
router.delete('/:id',verifyTokenAndAthorization,DeleteUser);
router.get('/',verifyTokenAndAthorization,GetUsers);



module.exports = router;