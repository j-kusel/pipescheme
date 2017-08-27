process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configExpress = require('./config/express');
const configMongoose = require('./config/mongoose');

const app = configExpress();
const db = configMongoose();

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');

