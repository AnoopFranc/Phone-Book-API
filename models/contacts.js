const mongoose = require('mongoose');
//importing validator module for validation and authentication
const validator = require('validator'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let Schema = mongoose.Schema;
// Setup schema
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid');
                 
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    phone: Number,
    tokens: [{token: {
        type: String,
        required: true
    }
}]
});

//methods are used for accessing instances
//arrow function cannot be used as this is not bindable in arrow function
userSchema.methods.createToken = async function ()  {
    let user = this; 
    let token = jwt.sign({_id: user._id.toString()}, process.env.SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}
// for matching login credentials declared static for accesing the model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    return isMatch;
}

// Hash the plain text password before saving using bcyrpt 
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const User = mongoose.model('User',userSchema);
// Export Contact model
module.exports = User;