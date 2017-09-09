const users = require('../controllers/users.server.controller.js');

module.exports = (function(app) {

    app.route('signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('signin')
        .get(users.renderSignup)
        .post(users.signup);

});

