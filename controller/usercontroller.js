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
        //creates jwt token
        const token = await user.createToken();
        res.status(201).send({user:user,token:token});
    } catch (error) {
     res.status(400).send({message: error.message});   
    }

   

}

exports.Login = async (req, res,next) => {
  
    try {
        //calling satatic method of matching credentials
        const match = await User.findByCredentials(req.body.email,req.body.password)
        if(match){
            //returns other registered contacts without the password and token field as an array
            const users = await User.find({_id: { $ne: req.user._id }}).select('-password').select('-tokens');
            res.status(201).send({ users: users })
        }
        else{
            throw new Error();
        }
    } catch (e) {
        res.status(400).send({message: e.message})
    }
}