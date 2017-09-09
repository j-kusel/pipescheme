const path = require('path');
const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');

module.exports = function() {
    const app = express();

    (process.env.NODE_ENV === 'development') ? app.use(morgan('dev')) : app.use(compression());
    app.use(methodOverride());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/pipeline.server.routes.js')(app);
    require('../app/routes/update.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);

    app.use('/', express.static('./public'));
    app.use('/lib', express.static('./node_modules'));
    app.use('/bower', express.static('./bower_components'));

    return app;
};
