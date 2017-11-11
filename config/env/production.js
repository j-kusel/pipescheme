const media = '/var/www';
const auth = '/etc/auth';

module.exports = {
	port: 8001,
	db: 'mongodb://localhost/accidents',
	fileUploads: media + '/pipescheme',
    sessionSecret: require(auth + '/sessionSecret.js'),
    facebook: require(auth + '/facebookOAuth.js'),
    twitter: require(auth + '/twitterOAuth.js'),
    googleKey: require(auth + '/googleAPI.js'),
    accidents: '/var/www/accidents/PHMSA_accidents'
};