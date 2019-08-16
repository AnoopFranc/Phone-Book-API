const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
    phone: {
        type: Number
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact