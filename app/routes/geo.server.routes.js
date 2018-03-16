const api = require('../controllers/api.server.controller.js');

module.exports = (function (app) {
    app.route('/api/geo')
        .get(api.geo);
});
