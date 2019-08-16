const express = require('express')
const router = express.Router();

const auth = require('./auth');
const contactControll = require('../controller/contactController');

//routes to create get and edit contacts
router.post('/contact', auth, contactControll.createContact)

router.get('/contacts', auth, contactControll.getAll)

router.patch('/contact/:id', auth, contactControll.updateContact)


module.exports = router