const express = require('express');

module.exports = function() {
    const app = express();
    app.set('views', './views');
    app.set('view engine', 'html');
    app.get('/', (req, res) => {
        res.render('splash');
    });

    return app;
};
