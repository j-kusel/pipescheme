var csv = require('../../config/csv');         // get csv parser
var fs = require('fs');
const googleAPI = require('../../config/env/googleAPI');    // get API key
const config = require('../../config/config.js');
//const uploader = require('../../config/multer.js')(config.fileUploads); 
var formidable = require('formidable');
var util = require('util');

const mongoose = require('mongoose');
        
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

exports.update = function(req, res, next) {
    csv.csvStream('public/csv/jan2010-present.csv', 'Accident');
    // USE FLASH FOR SUCCESS MESSAGE
    res.render('index');
};

exports.uploadPhoto = function(req, res, next) {
    console.log('made it to uploader');

    var form = new formidable.IncomingForm(); 
    req.body.photo_id = new mongoose.Types.ObjectId;
    var filepath = config.fileUploads;
    form.uploadDir = filepath;
    mkdirCheck(form.uploadDir, function (err) {
        form.parse(req, function (err, fields, files) {
            var oldpath = files.userPhoto.path;
            req.body.location = fields.location;
            var newdir = form.uploadDir + '/' + req.body.location;
            req.body.filename = '/' + filepath.split('/').pop() + '/' + req.body.location + '/' + req.body.photo_id + '.jpg';
            var newpath = filepath + '/' + req.body.location + '/' + req.body.photo_id + '.jpg';
            mkdirCheck(newdir, function (err) {
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                    next();
                });
            });
        });
    });

    /* uploader(req, res, function (err) {
        if (err) {
            return res.end('error uploading file: ' + err);
        } else {
            console.log('file uploaded. files: ');
            req.body.filename = '/' + req.file.path.split('/').slice(-3).join('/');
            console.log(req.body.filename);
            
            next();
        }
    }); */
};

exports.savePhoto = function(req, res, next) {
    console.log('made it to saver');
    var Photo = mongoose.model('Photo');
    var newPhoto = new Photo({
        _id: req.body.photo_id,
        location: req.body.location,
        filename: req.body.filename,
        owner: req.user._id
    });
    newPhoto.save(function (err) {
       console.log('error saving: ' + err);
    });
    return res.redirect('/');
}

exports.accidents = function(req, res, next) {
    console.log('api hit.');
    console.log(req.query);
    var Accident = mongoose.model('Accident');
    var query = {
        LOCATION_STATE_ABBREVIATION: req.params.state
    };
    if (req.query.fatal == 'true') query.FATALITY_IND = true;
    if (req.query.year && req.query.year !== 'all') query.IYEAR = req.query.year;

    Accident.find(query, (err, accidents) => {
        if (err) {
            return next(err);
        }
        res.json(accidents);
    })
    .limit(100); // parseInt(req.params.limit));
};

exports.photos = function(req, res, next) {
    var Photo = mongoose.model('Photo');
/*    if (!req.body) {
        console.log('didnt find photo');
        return res.redirect('/');
    }
*/
    var query = {};
    if (req.query.location) query.location = req.query.location;
    if (req.query.owner) query._id = req.query.owner;
    Photo
        .find(query, (err, photos) => {
            if (err) {
                return next(err);
            }
            let thumbPhotos = []
            photos.forEach(function (photo) {
                photo.thumb = photo.filename + '?dim=200x100';
                thumbPhotos.push(photo);
            });
            res.json(thumbPhotos);
        });
};
