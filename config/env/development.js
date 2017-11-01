module.exports = {
	port: 3000,
    db: 'mongodb://localhost/accidents',
    fileUploads: require('./filePointer.js'),
    sessionSecret: require('./sessionSecret.js'),
    facebook: require('./facebookOAuth.js'),
    twitter: require('./twitterOAuth.js'),
    googleKey: require('./googleAPI')
};
