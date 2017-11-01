const media = '/var/www';
const auth = '/etc/auth';

module.exports = {
	port: 8080,
	db: 'mongodb://localhost:pipescheme',
	fileUploads: media + '/pipescheme',
    sessionSecret: require(auth + '/sessionSecret.js'),
    facebook: require(auth + '/facebookOAuth.js'),
    twitter: require(auth + '/twitterOAuth.js'),
    googleKey: require(auth + '/googleAPI.js')
};