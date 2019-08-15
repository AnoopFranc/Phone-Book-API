const jwt = require('jsonwebtoken');

const userM = require('../models/contacts'); 


const auth = async (req,res,next) => {
    try {
        //getting acces of token from the request header
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await userM.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth;