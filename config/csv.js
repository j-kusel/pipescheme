var csv = require('fast-csv'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    http = require('http'),
    unzip = require('unzip');
    request = require('request');
    xlsx = require('node-xlsx');

exports.downloader = function (url, filePath, callback) {
    var file = fs.createWriteStream(filePath + '.zip', {flags: 'w'});
    request({
        url: 'http://phmsa.dot.gov/staticfiles/PHMSA/DownloadableFiles/Pipeline/PHMSA_Pipeline_Safety_Flagged_Incidents.zip',
        method: 'GET',
        encoding: null,
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    })
        .on('error', (err) => {
            file.close();
            callback(err);
        })
        .pipe(file)
        .on('close', () => {
            console.log('downloaded!');
            file = fs.createReadStream(filePath + '.zip').pipe(unzip.Extract({path: filePath}));
            file.on('close', callback);
        });
};

exports.xlsxStream = function(filePaths, index, model) {
    Object.keys(filePaths).forEach(function (accidentType) {
        console.log('on ' + accidentType + filePaths[accidentType]);
        var sheet = xlsx.parse(filePaths[accidentType])[index];
        var headers = sheet['data'].shift();
        for (var r = 1; r < sheet['data'].length; r++) {
            var dbModel = mongoose.model(model)();
            var row = sheet['data'][r];
            for (var col = 0; col < row.length; col++) {
                dbModel.set(headers[col], row[col]);
            }
            //var report = dbModel.get('REPORT_NUMBER').toString();
            //var supplemental = dbModel.get('SUPPLEMENTAL_NUMBER').toString();
            //dbModel.set('REPORT_NUMBER', parseInt(report + supplemental));
            dbModel.set('TYPE', accidentType);
            dbModel.save(function (err) {
                //console.log(err);
            });
        }
    });
    //console.log(sheet['data'][1]);
}

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
                //if (err) console.log(err);
            });
        })
        .on('end', function() {
            console.log('done');
        });
};
