process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const https = require('https');
const fs = require('fs');

const config = require('./config/config');
var db, app, passport;

if (process.env.NODE_ENV != 'maintenance') {

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

if (process.env.NODE_ENV == 'production') {
    var ssl = {
        key: fs.readFileSync(config.sslKey),
        cert: fs.readFileSync(config.sslCert)
    };

    https.createServer(ssl, app).listen(8443);
}

console.log('Server running at http://localhost:' + config.port + '/');

