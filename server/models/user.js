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
// Returning promise to allow server.js to chain on to it by doing .then again. Stops execution and returns promise to calling function where it continues
// Value will get passed on as success argument in next then call
// Can only access token from promise since it is part of the "resolved" so we return the promise to the calling function in server.js to chain on to
    return user.save().then(() => { // Once user is saved, return token
        return token;
    });
};

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded; //Will hold decoded JWT values
    
    try{
        decoded = jwt.verify(token, 'abc123');
    } catch(e){
        //catch error if verify fails want the code to stop here dont want to move on, reject promise
        // return new Promise((resolve, reject) => {
        //     reject();})
        return Promise.reject();
    }

    return User.findOne({ //Searches for user with passed in token values, returns promise with user object if pass
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

var User = mongoose.model('User', UserSchema);
module.exports = {User};