const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const Joi = require("joi");


const UserSchema =  mongoose.Schema({

    email : String,
    password : String,
    role :  {type : String, default : 'Patient'} 

})



const User = mongoose.model('User', UserSchema)


const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};


module.exports =  {User, validate};