process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('./config/config');
var db, app, passport;

if (process.env.NODE_ENV == 'maintenance') {

    const configMongoose = require('./config/mongoose');
    const configExpress = require('./config/express');
    const configPassport = require('./config/passport');

    db = configMongoose();
    app = configExpress();
    passport = configPassport();

} else {
    app = require('./maintenance/express')();
}

app.listen(config.port);
module.exports = app;

console.log('Server running at http://localhost:' + config.port + '/');

