var csv = require('../../config/csv');         // get csv parser
const googleAPI = require('../../config/env/googleAPI');    // get API key

const mongoose = require('mongoose');

exports.update = function(req, res, next) {
    csv.csvStream('public/csv/jan2010-present.csv', 'Accident');
    // USE FLASH FOR SUCCESS MESSAGE
    res.render('index');
};

exports.accidents = function(req, res, next) {
    var Accident = mongoose.model('Accident');
    console.log('fatal param: ' + req.query.fatal);
    query = {
        LOCATION_STATE_ABBREVIATION: req.params.state
    };
    if (req.query.fatal == 'true') query.FATALITY_IND = true;
    Accident.find(query, (err, accidents) => {
        if (err) {
            return next(err);
        }
        res.json(accidents);
    })
    .limit(100); // parseInt(req.params.limit));
};
