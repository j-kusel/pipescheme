var csv = require('../../config/csv');         // get csv parser
var fs = require('fs');
var http = require('http');
const config = require('../../config/config.js');
const googleAPI = config.googleAPI;    // get API key
const PHMSA_FLAGGED_INCIDENTS_URL = 'http://phmsa.dot.gov/staticfiles/PHMSA/DownloadableFiles/Pipeline/PHMSA_Pipeline_Safety_Flagged_Incidents.zip';
const PHMSA_FLAGGED_INCIDENTS_FILEPATH = config.accidents;

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
    csv.downloader(PHMSA_FLAGGED_INCIDENTS_URL, PHMSA_FLAGGED_INCIDENTS_FILEPATH,
        function (err) {
            if (!err) {
                var sheets = {
                    GTGGUNGS: [
                        //'public/csv/jan2010-present/gtgg1986to2001.xlsx',
                        //'public/csv/jan2010-present/gtgg2002to2009.xlsx',
                        'public/csv/jan2010-present/gtggungs2010toPresent.xlsx'
                    ], 
                    GD: [
                        //'public/csv/jan2010-present/gd1986tofeb2004.xlsx',
                        //'public/csv/jan2010-present/gdmar2004to2009.xlsx',
                        'public/csv/jan2010-present/gd2010toPresent.xlsx'
                    ],
                    HL: [
                        //'public/csv/jan2010-present/hl1986to2001.xlsx',
                        //'public/csv/jan2010-present/hl2002to2009.xlsx',
                        'public/csv/jan2010-present/hl2010toPresent.xlsx'
                    ],
                    LNG: [
                        'public/csv/jan2010-present/lng2011toPresent.xlsx'
                    ]
                }
                csv.xlsxStream(sheets, 1, 'Accident');
                // err ? console.log(err) : csv.csvStream(PHMSA_FLAGGED_INCIDENTS_FILEPATH + '.csv', 'Accident');
                // USE FLASH FOR SUCCESS MESSAGE
            }
            res.render('index');
        });
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
            req.body.owner = fields.owner;
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

exports.deletePhoto = function(req, res, next) {
    var Photo = mongoose.model('Photo');
    Photo.findById(req.query._id, function(err, photo) {
        if (req.user._id.toString() == photo.owner.toString()) {
            var filename = photo.filename;
            photo.remove(function (err) {
                    if (err) {
                        console.log('error deleting from database: ' + err);
                    } else {
                        fs.unlink(config.media + filename, function (err) {
                            if (err) return console.log(err);
                            console.log('file deleted');
                        });
                    }
                });
        }
    });
    return res.redirect(303, '/');
}

exports.accidents = function(req, res, next) {
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
    if (req.query.owner) query.owner = req.query.owner;
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
