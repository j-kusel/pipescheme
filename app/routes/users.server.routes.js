const users = require('../controllers/users.server.controller.js');
const passport = require('passport');

module.exports = (function(app) {

    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/signin',
                failureFlash: true
            }));

    app.get('/oauth/facebook', passport.authenticate('facebook', {
            failureRedirect: '/'
        }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
            failureRedirect: '/',
            successRedirect: '/'
        }));

    app.route('/logout')
        .get(users.logout);

});

