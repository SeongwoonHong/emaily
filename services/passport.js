const passport = require('passport');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { // user comes from down there from done function. second argument. this fucntion generates the identifying piece of info
    done(null, user.id); // first argument is for error. user.id refers to id for mongo record
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => { // called anytime user was redirected to our application from google
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser); // first argument is for error
                } else {
                    // we don't have a user record with this ID, make a new record
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            })
        // console.log('access token: ', accessToken);
        // console.log('refresh token: ', refreshToken);
        // console.log('profile: ', profile);
    })
);
