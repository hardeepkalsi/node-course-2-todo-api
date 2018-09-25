const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth'; //Defines type of access
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); // Creates JWT using user ID and access mode for a specific user

    user.tokens.push({access, token}); // Pushes access variable and token to users token array and users object
// Returning promise to allow server.js to chain on to it by doing .then again. 
// Value will get passed on as success argument in next then call
    return user.save().then(() => { // Once user is saved, return token
        return token;
    });
};

var User = mongoose.model('User', UserSchema);
module.exports = {User};