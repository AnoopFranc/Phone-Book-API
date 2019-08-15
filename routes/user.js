const express =require('express');
//importing auth middleware
const auth = require('./auth');

//importing controller as I follow mvc model
const usercontroll = require('../controller/usercontroller');
const router = express.Router();

router.post('/register',usercontroll.Register);

//auth middleware is added as the second argument so as to authenticate before using going into login controller
router.post('/login',auth,usercontroll.Login);


module.exports = router;