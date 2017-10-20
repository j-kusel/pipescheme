const User = require('mongoose').model('User');
const passport = require('passport');

function getErrorMessage(err) {
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Are you already registered?';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

exports.signup = function(req, res, next) {
    if (!req.user) {
        const user = new User(req.body);
        console.log('body');
        console.log(req.body);
        user.provider = 'local';
        user.save((err) => {
            if (err) {
                const message = getErrorMessage(err);

                req.flash('error', message);
                return res.redirect('/');
            }
            req.login(user, (err) => {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.saveOAuthUserProfile = function(req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, (err, user) => {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                const newUser = new User(profile);
                newUser.username = profile.username || ((profile.email) ? profile.email.split('\'')[0] : '');

                newUser.save((err) => {
                    return done(err, newUser);
                });
            } else {
                return done(err, user);
            }
        }
    });
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};
