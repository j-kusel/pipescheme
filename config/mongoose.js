const config = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = function() {
    const db = mongoose.connect(config.db);
    require('../app/models/accident.server.model');
    require('../app/models/user.server.model');
    return db;
};
