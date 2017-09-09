process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configMongoose = require('./config/mongoose');
const configExpress = require('./config/express');
const configurePassport = require('./config/passport');

const db = configMongoose();
const app = configExpress();
const passport = configurePassport();

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');

