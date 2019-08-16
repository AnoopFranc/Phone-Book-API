const User = require('../models/user');

exports.Register = async (req,res,next) => {
    let name = req.body.name;
    let pass = req.body.password;
    try {
        let user = new User({
            name: name,
            password: pass,
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
        const match = await User.findByCredentials(req.body.name,req.body.password)
        if(match){
            //returns other registered contacts without the password and token field as an array
            //select excludes the fields specified
            //limit limits results currently 2 customize it with query
            //sort for sorting according to name
            const user =  req.user;
            
            
            /* 
            await User.find({_id: { $ne: req.user._id }})
            .select('-password')
            .select('-tokens')
            .limit(2)
            .skip(parseInt(req.query.skip))
            .sort({name:1});
 */
            
            res.status(201).send({message: `logged in as ${req.user.name}` , user: user })
        }
        else{
            throw new Error();
        }
    } catch (e) {
        res.status(400).send({message: e.message})
    }
}