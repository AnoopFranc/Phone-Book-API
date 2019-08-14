const express =require('express');

const auth = require('./auth');

const usercontroll = require('../controller/usercontroller');
const router = express.Router();

router.post('/register',usercontroll);
router.post('/',auth,usercontroll);


module.exports = router;