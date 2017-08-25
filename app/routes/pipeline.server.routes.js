const pipeline = require('../controllers/pipeline.server.controller');

module.exports = (function (app) {
    app.route('/')
        .get(pipeline.dashboard);
});
