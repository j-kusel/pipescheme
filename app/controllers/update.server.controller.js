var csv = require('../../config/csv');         // get csv parser

exports.update = function(req, res, next) {
    csv.csvStream('public/jan2010-present.csv', 'Accident');
    // USE FLASH FOR SUCCESS MESSAGE
    res.render('index');
};
