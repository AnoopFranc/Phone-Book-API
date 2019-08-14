const mongoose = require('mongoose');
//importing validator module for validation
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
    phone: String,
});

//methods are used for accessing instances
//arrow function cannot be used as this is not bindable in arrow function
userSchema.methods.createToken = async function ()  {
    let user = this; 
    let token = jwt.sign({_id: user._id.toString()}, process.env.SECRET);
}

// Export Contact model
module.exports = mongoose.model('user',userSchema);