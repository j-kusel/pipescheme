const api = require('../controllers/api.server.controller.js');

module.exports = (function (app) {
    app.route('/api/update')
        .get(api.update);            // switch to POST with admin validation
    app.route('/api/accidents/:limit/:skip')
        .get(api.accidents);
});
