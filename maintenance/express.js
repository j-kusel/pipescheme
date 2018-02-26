const express = require('express');

module.exports = function() {
    const app = express();
    app.set('views', './views');
    app.get('/', (req, res) => {
        res.render('splash');
    });

    return app;
};
