const express = require('express');
const path = require('path');

module.exports = function() {
    const app = express();
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/views/splash.html'));
    });

    return app;
};
