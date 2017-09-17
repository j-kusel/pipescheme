var csv = require('../../config/csv');         // get csv parser
const googleAPI = require('../../config/env/googleAPI');    // get API key

const mongoose = require('mongoose');

exports.update = function(req, res, next) {
    csv.csvStream('public/csv/jan2010-present.csv', 'Accident');
    // USE FLASH FOR SUCCESS MESSAGE
    res.render('index');
};

exports.uploadPhoto = function(req, res, next) {
    var Photo = mongoose.model('Photo');
    console.log('post: ' + req.body);
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
    console.log('fatal param: ' + req.query.fatal);
    console.log('year param: ' + req.query.year);
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
    console.log('photo API hit');
    var Photo = mongoose.model('Photo');
/*    if (!req.body) {
        console.log('didnt find photo');
        return res.redirect('/');
    }
*/
    var query = {};
    if (req.query.location) query.location = req.query.location;
    if (req.query.owner) query.owner = req.query.owner;
    console.log('query: ' + query);
    Photo
        .find(query, (err, photos) => {
            if (err) {
                console.log('so its a query error...');
                return next(err);
            }
            res.json(photos);
        });
};
