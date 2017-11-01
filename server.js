process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configMongoose = require('./config/mongoose');
const configExpress = require('./config/express');
const configPassport = require('./config/passport');
const config = require('./config/config');

const db = configMongoose();
const app = configExpress();
const passport = configPassport();

app.listen(config.port);
module.exports = app;

console.log('Server running at http://localhost:' + config.port + '/');

