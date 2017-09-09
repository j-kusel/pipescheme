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

    app.route('/logout')
        .get(users.logout);

});

