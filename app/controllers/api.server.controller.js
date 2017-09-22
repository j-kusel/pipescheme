var csv = require('../../config/csv');         // get csv parser
var fs = require('fs');
const googleAPI = require('../../config/env/googleAPI');    // get API key
const config = require('../../config/config.js');
const uploader = require('../../config/multer.js')(config.fileUploads); 

const mongoose = require('mongoose');
        

exports.update = function(req, res, next) {
    csv.csvStream('public/csv/jan2010-present.csv', 'Accident');
    // USE FLASH FOR SUCCESS MESSAGE
    res.render('index');
};

exports.uploadPhoto = function(req, res, next) {
    console.log('made it to uploader');
    uploader(req, res, function (err) {
        if (err) {
            return res.end('error uploading file: ' + err);
        } else {
            console.log('file uploaded. files: ');
            req.body.filename = '/' + req.file.path.split('/').slice(-3).join('/');
            console.log(req.body.filename);
            
            next();
        }
    });
};

exports.savePhoto = function(req, res, next) {
    console.log('made it to saver');
    var Photo = mongoose.model('Photo');
    console.log('post: ' + req.body.location);
    var newPhoto = new Photo({
        location: req.body.location,
        filename: req.body.filename
    });
    newPhoto.save(function (err) {
       console.log('error saving: ' + err);
    });
    return res.redirect('/');
}

exports.accidents = function(req, res, next) {
    var Accident = mongoose.model('Accident');
    var query = {
        LOCATION_STATE_ABBREVIATION: req.params.state
    };
    if (req.query.fatal == 'true') query.FATALITY_IND = true;
    if (req.query.year) query.IYEAR = req.query.year;

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
