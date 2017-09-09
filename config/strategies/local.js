const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({
            email: username
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: "Couldn't find email address - have you registered?"
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: "Password invalid."
                });
            }

            return done(null, user);
        });
    }));
};
