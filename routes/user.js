const express =require('express');

const auth = require('./auth');

const usercontroll = require('../controller/usercontroller');
const router = express.Router();

router.post('/register',usercontroll.Register);
router.post('/login',auth,usercontroll.Login);


module.exports = router;