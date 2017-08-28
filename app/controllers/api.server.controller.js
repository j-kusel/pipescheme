var csv = require('../../config/csv');         // get csv parser
const mongoose = require('mongoose');

exports.update = function(req, res, next) {
    csv.csvStream('public/csv/jan2010-present.csv', 'Accident');
    // USE FLASH FOR SUCCESS MESSAGE
    res.render('index');
};

exports.accidents = function(req, res, next) {
    var Accident = mongoose.model('Accident');
    Accident.find({LOCATION_STATE_ABBREVIATION: req.params.state}, (err, accidents) => {
        if (err) {
            return next(err);
        }
        res.json(accidents);
    })
    .limit(100); // parseInt(req.params.limit));
};
