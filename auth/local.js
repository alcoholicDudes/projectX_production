const route = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../database/modles').user;
const DatabaseAPIClass = require('../api/functions').databaseAPI;
const APIHelperFunctions = new DatabaseAPIClass(User);

passport.serializeUser((user, done) => {
    done(null, user.userId)
});

passport.deserializeUser((userid, done) => {
    APIHelperFunctions.getSpecificData('userId', userid)
        .then((user) => {
            if (!user) {
                done(new Error("no such user"))
            }
            done(null, user)
        }).catch((err) => {
        done(err)
    })
});

passport.use(new LocalStrategy((username, password, done) => {
    APIHelperFunctions.getSpecificData('userName', username)
        .then(user => {
            if (!user) {
                done(new Error('No such user'))
            }
            if (user.password !== password) {
                done(new Error('Wrong password'))
            }
            done(null, user)
        })
        .catch(err => {
            done(err)
        })
}));

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/profile',
}));

// post request to sign-up don't need passportJS
route.post('/signup', (req, res) => {
    APIHelperFunctions.getSpecificData('userName', req.body.userName)
        .then(currentUser => {
            if (currentUser) {
                res.send("username already exist")
                // disable sign-up button till username is unique
                // create AJAX request(refresh button) from frontend to check for username uniqueness
            }
        });

    APIHelperFunctions.addRow(req.body)
        .then(createdUser => {
            res.redirect('/auth/login')
        });
});

exports = module.exports = {
    route
};