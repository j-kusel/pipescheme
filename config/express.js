const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');

module.exports = function() {
    const app = express();

    (process.env.NODE_ENV === 'development') ? app.use(morgan('dev')) : app.use(compression());

    app.set('views', './app/views');

