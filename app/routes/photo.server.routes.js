const api = require('../controllers/api.server.controller.js');

module.exports = (function (app) {
    app.route('/api/photos')
        .get(api.photos)
        .post(api.uploadPhoto, api.savePhoto)
        .delete(api.deletePhoto);
});
