const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Contact = require('./contact');
let Schema = mongoose.Schema;
// Setup schema
let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    tokens: [{token: {
        type: String,
        required: true
    }
}]
});

//used when in reference to many values like when populating with comments in a certain post
userSchema.virtual('contacts', {
    ref: 'Contact',
    localField: '_id',
    foreignField: 'owner'
})

// we dont have to explicitly call toJSON method
//hides details like password and token 
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}




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
userSchema.statics.findByCredentials = async (name, password) => {
    const user = await User.findOne({ name })

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