const {SignUp,SignIn} = require('../Controllers/Auth');
const router = require('express').Router();


router.post('/signup',SignUp);
router.post('/login',SignIn);


module.exports = router;



