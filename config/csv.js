var csv = require("fast-csv"),
    mongoose = require('mongoose'),
    fs = require("fs");

exports.csvStream = function(filePath, model) {
    var stream = fs.createReadStream(filePath);
    csv
        .fromStream(stream, {headers: true})
        .on('data', function(data) {
            var dbModel = mongoose.model(model)();
            Object.keys(data).forEach(function(key) {
                dbModel.set(key, data[key]);
            });
            dbModel.save(function (err) {
                if (err) console.log(err);
            });
        })
        .on('end', function() {
            console.log('done');
        });
};
