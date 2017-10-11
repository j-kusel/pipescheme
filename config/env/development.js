module.exports = {
    db: 'mongodb://localhost/accidents',
    fileUploads: require('./filePointer.js'),
    sessionSecret: require('./sessionSecret.js'),
    facebook: require('./facebookOAuth.js')
};
