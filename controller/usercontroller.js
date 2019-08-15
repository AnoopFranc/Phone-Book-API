const User = require('../models/contacts');

exports.Register = async (req,res,next) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.password;
    let phone = req.body.phone;
    try {
        let user = new User({
            name: name,
            email: email,
            password: pass,
            phone: phone
        })
        await user.save();
        const token = await user.createToken();
        res.status(201).send({user:user,token:token});
    } catch (error) {
     res.status(400).send({message: error.message});   
    }

   

}

exports.Login = async (req, res,next) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send({ user: user })
    } catch (e) {
        res.status(400).send()
    }
}