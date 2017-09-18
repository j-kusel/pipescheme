var multer = require('multer');
var fs = require('fs');
const config = require('./config');

function mkdirCheck(path, mask, callback) {
    if (typeof(mask) == 'function') {
        callback = mask;
        mask = 511;
    }
    fs.mkdir(path, mask, function (err) {
        if (err) {
            if (err.code == 'EEXIST') {
                callback(null);
            } else {
                callback(err);
            }
        } else callback(null);
    });
}

module.exports = function (dest) {

    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            let filepath = config.fileUploads + '/' + req.body.location;
            mkdirCheck(filepath, function (err) {
                if (err) {
                    console.log('error initializing photo folder: ' + err);
                }
                callback(null, filepath);
            });
        },
        filename: function (req, file, callback) {
            if (!req.user) {
                req.flash('error', 'login before uploading a photo!');
            }
            callback(null, req.user._id + '.jpg');
        }
    });

    let uploader = multer({
        storage: storage
    }).single('userPhoto');

    return uploader;
};
