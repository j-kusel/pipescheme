const update = require('../controllers/update.server.controller.js');

module.exports = (function (app) {
    console.log('well we made it here');
    app.route('/update')
        .get(update.update);            // switch to POST with admin validation
});
