const express = require('express');

module.exports = function() {
    const app = express();
    app.get('/', (req, res) => {
        res.sendFile('./views/splash.html');
    });

    return app;
};
