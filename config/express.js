const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

module.exports = function() {
    const app = express();

    (process.env.NODE_ENV === 'development') ? app.use(morgan('dev')) : app.use(compression());
    app.use(methodOverride());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/pipeline.server.routes.js')(app);
    require('../app/routes/update.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
