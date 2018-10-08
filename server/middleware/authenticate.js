var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth'); //Retrieves xauth token from header

    User.findByToken(token).then((user) => { //Runs when token is valid but no user found, since promise still resolves if no user found check if !user
        if(!user){
            return Promise.reject(); // Goes to catch call and returns 401 error
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send(); // Runs for reject case where token did not verify and findByToken returns with a rejected promise
    });
};

module.exports = {authenticate};